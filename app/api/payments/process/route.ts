import { NextRequest, NextResponse } from 'next/server';
import { sql } from '../../../db';

// Types for our payment processing
type PaymentDetails = {
  amount: number;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
  isRecurring: boolean;
};

type CustomerInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentDetails, customerInfo } = body as {
      paymentDetails: PaymentDetails;
      customerInfo: CustomerInfo;
    };
    
    // Validate input
    if (!paymentDetails?.amount || !customerInfo?.email) {
      return NextResponse.json(
        { success: false, message: 'Missing required payment information' },
        { status: 400 }
      );
    }
    
    // In a real application, this would call the payment gateway API
    // For demonstration, we'll simulate a payment processing delay and create a record in our database
    
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a mock transaction ID
    const transactionId = 'TX_' + Math.random().toString(36).substring(2, 15).toUpperCase() + 
                         Date.now().toString().substring(8);
    
    // Mock validation (in real application this would verify with the payment gateway)
    const isValidCard = validateCardNumber(paymentDetails.cardNumber);
    
    if (!isValidCard) {
      return NextResponse.json(
        { success: false, message: 'Invalid card information', error: 'INVALID_CARD' },
        { status: 400 }
      );
    }
    
    // Simulate 95% success rate for the payment
    const isSuccessful = Math.random() < 0.95;
    
    if (!isSuccessful) {
      return NextResponse.json(
        { success: false, message: 'Payment was declined', error: 'PAYMENT_DECLINED' },
        { status: 400 }
      );
    }
    
    // In a real application, we would record the payment in our database
    // Find or create user
    const userResult = await sql`
      WITH user_data AS (
        SELECT user_id FROM users WHERE email = ${customerInfo.email}
      ), inserted_user AS (
        INSERT INTO users (full_name, email, phone, password_hash, created_at, updated_at)
        SELECT 
          ${customerInfo.firstName + ' ' + customerInfo.lastName}, 
          ${customerInfo.email},
          ${customerInfo.phone},
          '', -- placeholder for password hash (would be properly handled in real auth)
          NOW(),
          NOW()
        WHERE NOT EXISTS (SELECT 1 FROM user_data)
        RETURNING user_id
      )
      SELECT user_id FROM user_data
      UNION ALL
      SELECT user_id FROM inserted_user
    `;
    
    const userId = userResult[0]?.user_id;
    
    // Record the contribution
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
        ${transactionId},
        'credit_card',
        NOW()
      )
    `;
    
    // If recurring, set up the recurring contribution
    if (paymentDetails.isRecurring) {
      const nextBillingDate = new Date();
      nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
      
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
          ${nextBillingDate.toISOString()},
          NOW()
        )
      `;
    }
    
    // Return success response
    return NextResponse.json({
      success: true,
      transactionId,
      message: paymentDetails.isRecurring 
        ? 'Recurring contribution set up successfully' 
        : 'Contribution processed successfully'
    });
    
  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while processing the payment', error: String(error) },
      { status: 500 }
    );
  }
}

// Helper function to validate card number (basic check)
function validateCardNumber(cardNumber: string): boolean {
  // Remove spaces and non-digit characters
  const digitsOnly = cardNumber.replace(/\D/g, '');
  
  // Basic length check (most cards are 13-19 digits)
  return digitsOnly.length >= 13 && digitsOnly.length <= 19;
}
