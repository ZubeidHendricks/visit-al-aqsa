import Link from 'next/link';

export default function HowItWorks() {
  const steps = [
    {
      icon: '💰',
      title: 'Contribute',
      description: 'Make a contribution of R300 to our fund. Every contribution counts toward sending someone to Al Aqsa.'
    },
    {
      icon: '🏦',
      title: 'Pool Funds',
      description: 'All contributions are pooled together to cover flights, accommodation, and meals for selected applicants.'
    },
    {
      icon: '👥',
      title: 'Select Recipients',
      description: 'Recipients are selected on a first-come, first-served basis from our applicant pool.'
    },
    {
      icon: '✈️',
      title: 'Facilitate Travel',
      description: 'We handle all the logistics to ensure a smooth, meaningful journey to Al Aqsa for the selected individuals.'
    }
  ];
  
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-3">How Our Crowdfunding Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A simple, transparent process to help more people visit Al Aqsa
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 transition-transform hover:transform hover:-translate-y-2 duration-300">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-green-700 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/how-it-works" 
            className="inline-block px-6 py-3 border-2 border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-50 transition duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
