import PaymentForm from '@/app/components/PaymentForm';

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
          <PaymentForm 
            amount={300} 
            isRecurring={false} 
            allowCustomAmount={true}
            buttonText="Complete Contribution"
          />
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
