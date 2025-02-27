import { NextRequest, NextResponse } from 'next/server';
import { processPayment, PaymentDetails, CustomerInfo } from '@/app/lib/paymentService';
import { sql } from '@/app/db';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const data = await request.json();
    
    // Extract payment details and customer info from the request
    const paymentDetails: PaymentDetails = {
      amount: data.amount || 300, // Default to R300 if not specified
      isRecurring: data.isRecurring || false,
      cardNumber: data.cardNumber,
      expiryDate: data.expiryDate,
      cvv: data.cvv,
      cardName: data.cardName,
      email: data.email
    };
    
    const customerInfo: CustomerInfo = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone
    };
    
    // Process the payment
    const paymentResult = await processPayment(paymentDetails, customerInfo);
    
    // If the payment was successful, save it to the database
    if (paymentResult.success) {
      try {
        // Check if user exists
        const existingUsers = await sql`
          SELECT user_id FROM users WHERE email = ${customerInfo.email}
        `;
        
        let userId;
        
        if (existingUsers.length === 0) {
          // Create a new user
          const newUserResult = await sql`
            INSERT INTO users (
              full_name, 
              email, 
              phone, 
              password_hash, 
              created_at, 
              updated_at
            ) VALUES (
              ${`${customerInfo.firstName} ${customerInfo.lastName}`}, 
              ${customerInfo.email}, 
              ${customerInfo.phone}, 
              ${'placeholder_hash'}, 
              NOW(), 
              NOW()
            ) RETURNING user_id
          `;
          
          userId = newUserResult[0].user_id;
        } else {
          userId = existingUsers[0].user_id;
        }
        
        // Add the contribution
        await sql`
          INSERT INTO contributions (
            user_id, 
            amount, 
            is_recurring, 
            status, 
            transaction_reference, 
            payment_method, 
            created_at
          ) VALUES (
            ${userId}, 
            ${paymentDetails.amount}, 
            ${paymentDetails.isRecurring}, 
            'completed', 
            ${paymentResult.transactionId || 'unknown'}, 
            'credit_card', 
            NOW()
          )
        `;
        
        // If this is a recurring contribution, add it to the recurring_contributions table
        if (paymentDetails.isRecurring) {
          const nextMonth = new Date();
          nextMonth.setMonth(nextMonth.getMonth() + 1);
          
          await sql`
            INSERT INTO recurring_contributions (
              user_id, 
              amount, 
              frequency, 
              status, 
              next_billing_date, 
              start_date
            ) VALUES (
              ${userId}, 
              ${paymentDetails.amount}, 
              'monthly', 
              'active', 
              ${nextMonth.toISOString()}, 
              NOW()
            )
          `;
        }
        
        // Update the funding goal progress
        await sql`
          UPDATE funding_goals 
          SET current_amount = current_amount + ${paymentDetails.amount}
          WHERE status = 'active'
          ORDER BY start_date DESC
          LIMIT 1
        `;
        
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Payment was processed but we failed to save it
        // In a production system, you would handle this situation more gracefully
        // e.g., by having a reconciliation process
      }
    }
    
    // Return the payment result
    return NextResponse.json(paymentResult);
    
  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Payment processing failed', 
        error: String(error) 
      }, 
      { status: 500 }
    );
  }
}
