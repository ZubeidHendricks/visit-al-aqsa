import Link from 'next/link';

export const metadata = {
  title: 'Monthly Contribution - Visit Al Aqsa',
  description: 'Set up a monthly contribution of R300 to help people visit Al Aqsa.'
};

export default function MonthlyContributionPage() {
  return (
    <div className="py-10 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-4">Set Up Monthly Contributions</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your recurring contribution of R300 per month will help consistently fund journeys to Al Aqsa.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg mb-6">
            <div>
              <h2 className="font-semibold text-green-800">Contribution Amount</h2>
              <p className="text-gray-600">Monthly recurring payment</p>
            </div>
            <div className="text-2xl font-bold text-green-600">R300/month</div>
          </div>
          
          <form className="space-y-6">
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
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Billing Preferences */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-green-700 mb-4">Billing Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Your card will be charged R300 today and then R300 on this same date each month until you cancel.</p>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="cancelAnytime"
                      name="cancelAnytime"
                      type="checkbox"
                      className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      checked
                      disabled
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="cancelAnytime" className="font-medium text-gray-700">
                      Cancel anytime from your account dashboard
                    </label>
                  </div>
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
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  I agree to the <Link href="/terms" className="text-green-600 hover:text-green-800">Terms and Conditions</Link>, <Link href="/privacy" className="text-green-600 hover:text-green-800">Privacy Policy</Link>, and authorize recurring monthly charges of R300 to my payment method until canceled.
                </label>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300"
              >
                Start Contributing R300/month
              </button>
            </div>
          </form>
        </div>
        
        {/* Secure Payment Notice */}
        <div className="text-center text-sm text-gray-600">
          <p className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Secure payment processing. Your financial information is never stored on our servers.
          </p>
        </div>
      </div>
    </div>
  );
}
