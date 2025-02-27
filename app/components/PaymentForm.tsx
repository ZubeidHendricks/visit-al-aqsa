'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

interface PaymentFormProps {
  amount: number;
  isRecurring: boolean;
  allowCustomAmount?: boolean;
  buttonText: string;
}

export default function PaymentForm({ 
  amount, 
  isRecurring, 
  allowCustomAmount = false,
  buttonText
}: PaymentFormProps) {
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [customAmount, setCustomAmount] = useState(amount);
  const [recurringOption, setRecurringOption] = useState(isRecurring);
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successDetails, setSuccessDetails] = useState({ transactionId: '' });
  
  // Handle preset amount buttons for custom amount form
  const handlePresetAmount = (preset: number) => {
    if (allowCustomAmount) {
      setCustomAmount(preset);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!firstName || !lastName || !email || !phone || !cardNumber || !expiryDate || !cvv || !cardName || !termsAccepted) {
      setErrorMessage('Please fill in all required fields');
      return;
    }
    
    // Set UI state to processing
    setIsSubmitting(true);
    setPaymentStatus('processing');
    setErrorMessage('');
    
    try {
      // Prepare payment data
      const paymentData = {
        firstName,
        lastName,
        email,
        phone,
        cardNumber,
        expiryDate,
        cvv,
        cardName,
        amount: allowCustomAmount ? customAmount : amount,
        isRecurring: recurringOption
      };
      
      // Call the payment API
      const response = await fetch('/api/payments/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
      
      const result = await response.json();
      
      // Handle response
      if (result.success) {
        setPaymentStatus('success');
        setSuccessDetails({ 
          transactionId: result.transactionId || 'N/A' 
        });
      } else {
        setPaymentStatus('error');
        setErrorMessage(result.error || 'Payment failed. Please try again.');
      }
    } catch (error) {
      setPaymentStatus('error');
      setErrorMessage('An unexpected error occurred. Please try again later.');
      console.error('Payment submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Show success message if payment was successful
  if (paymentStatus === 'success') {
    return (
      <div className="bg-green-50 p-6 rounded-lg text-center">
        <div className="mb-4 flex justify-center">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-green-800 mb-2">Thank You for Your Contribution!</h2>
        <p className="text-gray-600 mb-4">
          Your payment of R{allowCustomAmount ? customAmount : amount}{recurringOption ? '/month' : ''} has been processed successfully.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Transaction ID: {successDetails.transactionId}
        </p>
        <p className="text-gray-600 mb-6">
          You will receive a confirmation email shortly with details of your contribution.
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            href="/" 
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Contribution Amount (only for custom amount) */}
      {allowCustomAmount && (
        <div>
          <h3 className="text-lg font-medium text-green-700 mb-4">Contribution Amount</h3>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount (Rand)</label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">R</span>
              </div>
              <input
                type="number"
                name="amount"
                id="amount"
                className="block w-full rounded-md border-gray-300 pl-10 pr-12 focus:border-green-500 focus:ring-green-500 py-2 border"
                placeholder="0.00"
                min="50"
                step="10"
                value={customAmount}
                onChange={(e) => setCustomAmount(Number(e.target.value))}
                required
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">Minimum contribution: R50</p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <button 
              type="button" 
              className="px-4 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={() => handlePresetAmount(100)}
            >
              R100
            </button>
            <button 
              type="button" 
              className="px-4 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={() => handlePresetAmount(300)}
            >
              R300
            </button>
            <button 
              type="button" 
              className="px-4 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={() => handlePresetAmount(500)}
            >
              R500
            </button>
            <button 
              type="button" 
              className="px-4 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={() => handlePresetAmount(1000)}
            >
              R1000
            </button>
          </div>
          
          <div className="mt-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="recurring"
                  name="recurring"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  checked={recurringOption}
                  onChange={() => setRecurringOption(!recurringOption)}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="recurring" className="font-medium text-gray-700">
                  Make this a monthly recurring contribution
                </label>
                <p className="text-gray-500">You can cancel at any time from your account dashboard</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Non-custom amount display */}
      {!allowCustomAmount && (
        <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg mb-6">
          <div>
            <h2 className="font-semibold text-green-800">Contribution Amount</h2>
            <p className="text-gray-600">{isRecurring ? 'Monthly recurring payment' : 'One-time payment'}</p>
          </div>
          <div className="text-2xl font-bold text-green-600">R{amount}{isRecurring ? '/month' : ''}</div>
        </div>
      )}
      
      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-medium text-green-700 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input 
              type="text" 
              id="firstName" 
              name="firstName" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input 
              type="text" 
              id="lastName" 
              name="lastName" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
      
      {/* Payment Information */}
      <div>
        <h3 className="text-lg font-medium text-green-700 mb-4">Payment Information</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <input 
              type="text" 
              id="cardNumber" 
              name="cardNumber" 
              placeholder="1234 5678 9012 3456" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date (MM/YY)</label>
              <input 
                type="text" 
                id="expiryDate" 
                name="expiryDate" 
                placeholder="MM/YY" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
              <input 
                type="text" 
                id="cvv" 
                name="cvv" 
                placeholder="123" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
            <input 
              type="text" 
              id="cardName" 
              name="cardName" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
      
      {/* Terms & Conditions */}
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
            required
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="terms" className="font-medium text-gray-700">
            I agree to the <Link href="/terms" className="text-green-600 hover:text-green-800">Terms and Conditions</Link> and <Link href="/privacy" className="text-green-600 hover:text-green-800">Privacy Policy</Link>
            {recurringOption && ' and authorize recurring monthly charges to my payment method until canceled'}
          </label>
        </div>
      </div>
      
      {/* Error message */}
      {errorMessage && (
        <div className="p-3 bg-red-50 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}
      
      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full py-3 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 flex justify-center items-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : buttonText}
        </button>
      </div>
    </form>
  );
}
