import Link from 'next/link';

export const metadata = {
  title: 'Contribute - Visit Al Aqsa',
  description: 'Make your contribution to help someone visit Al Aqsa.'
};

export default function ContributePage() {
  return (
    <div className="py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Make Your Contribution</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your contribution of R300 will help fund flights, accommodation, and meals for individuals 
            selected to visit Al Aqsa. Together, we can make these spiritual journeys possible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Single Contribution Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:border-green-200 transition-all duration-300">
            <h3 className="text-xl font-semibold text-green-800 mb-2">Single Contribution</h3>
            <p className="text-3xl font-bold text-green-600 mb-4">R300</p>
            <p className="text-gray-600 mb-6">One-time contribution to our fund</p>
            <Link href="/contribute/single" className="block w-full py-2 px-4 bg-green-600 text-white text-center rounded-md hover:bg-green-700 transition duration-300">
              Contribute Once
            </Link>
          </div>
          
          {/* Monthly Contribution Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-green-500 relative transform hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 right-0 bg-green-500 text-white py-1 px-4 text-sm font-medium rounded-bl-lg rounded-tr-lg">
              Popular
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">Monthly Contribution</h3>
            <p className="text-3xl font-bold text-green-600 mb-4">R300/month</p>
            <p className="text-gray-600 mb-6">Recurring monthly contribution</p>
            <Link href="/contribute/monthly" className="block w-full py-2 px-4 bg-green-600 text-white text-center rounded-md hover:bg-green-700 transition duration-300">
              Contribute Monthly
            </Link>
          </div>
          
          {/* Custom Amount Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:border-green-200 transition-all duration-300">
            <h3 className="text-xl font-semibold text-green-800 mb-2">Custom Amount</h3>
            <div className="flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-green-600">R</span>
              <span className="text-3xl font-bold text-green-600">Custom</span>
            </div>
            <p className="text-gray-600 mb-6">Choose your own contribution amount</p>
            <Link href="/contribute/custom" className="block w-full py-2 px-4 bg-green-600 text-white text-center rounded-md hover:bg-green-700 transition duration-300">
              Custom Contribution
            </Link>
          </div>
        </div>
        
        {/* Why Contribute Section */}
        <div className="bg-green-50 rounded-lg p-6 mb-10">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Why Your Contribution Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-green-700 mb-2">What Your Contribution Covers</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Round-trip flights to Al Aqsa</li>
                <li>Accommodation during the journey</li>
                <li>Daily meals and necessities</li>
                <li>Local transportation</li>
                <li>Basic travel insurance</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-green-700 mb-2">How Funds Are Managed</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>100% of funds go directly to journey costs</li>
                <li>Transparent tracking of all contributions</li>
                <li>Regular updates on fund allocations</li>
                <li>First-come, first-served selection process</li>
                <li>Detailed expense reporting</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-green-800 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-green-700 mb-2">Is my contribution tax-deductible?</h3>
              <p className="text-gray-600">Currently, contributions are not tax-deductible. We are working on establishing a formal non-profit status to enable tax deductions in the future.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-green-700 mb-2">Can I cancel my monthly contribution?</h3>
              <p className="text-gray-600">Yes, you can cancel your monthly contribution at any time through your account dashboard or by contacting our support team.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-green-700 mb-2">How will I know my contribution was received?</h3>
              <p className="text-gray-600">You will receive an email confirmation immediately after your contribution is processed. You can also view your contribution history in your account dashboard.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-green-700 mb-2">Can I contribute on behalf of someone else?</h3>
              <p className="text-gray-600">Yes, you can contribute on behalf of someone else. Simply indicate this during the contribution process, and we'll send the acknowledgment to the person you specify.</p>
            </div>
          </div>
        </div>
        
        {/* Testimonial */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 mb-4 md:mb-0 flex justify-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-3xl text-green-800">Y</span>
              </div>
            </div>
            <div className="md:w-3/4">
              <p className="text-gray-600 italic mb-4">
                &ldquo;I never thought I could afford to visit Al Aqsa, but thanks to this platform and the generosity of contributors, my dream came true. The experience was truly life-changing, and I'm forever grateful.&rdquo;
              </p>
              <p className="font-semibold text-green-700">Yusuf Rahman, Johannesburg</p>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Ready to Make a Difference?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Your contribution, no matter how small, can help someone fulfill their dream of visiting Al Aqsa.
          </p>
          <Link href="/contribute/single" className="inline-block py-3 px-8 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300">
            Contribute Now - R300
          </Link>
        </div>
      </div>
    </div>
  );
}
