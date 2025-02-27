import Link from 'next/link';

export const metadata = {
  title: 'Custom Contribution - Visit Al Aqsa',
  description: 'Make a custom contribution to help people visit Al Aqsa.'
};

export default function CustomContributionPage() {
  return (
    <div className="py-10 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-4">Make a Custom Contribution</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every contribution, no matter the size, helps someone fulfill their dream of visiting Al Aqsa.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form className="space-y-6">
            {/* Contribution Amount */}
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
                    defaultValue="300"
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">Minimum contribution: R50</p>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <button type="button" className="px-4 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500">
                  R100
                </button>
                <button type="button" className="px-4 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500">
                  R300
                </button>
                <button type="button" className="px-4 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500">
                  R500
                </button>
                <button type="button" className="px-4 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500">
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
                  I agree to the <Link href="/terms" className="text-green-600 hover:text-green-800">Terms and Conditions</Link> and <Link href="/privacy" className="text-green-600 hover:text-green-800">Privacy Policy</Link>
                </label>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300"
              >
                Complete Contribution
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
