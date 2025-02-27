export default function Hero() {
  return (
    <div className="bg-green-50 py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Text content */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 mb-6">
              Help Someone Visit Al Aqsa
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Visit Al Aqsa is a crowdfunding initiative that helps individuals fulfill their dream of visiting Al Aqsa. 
              For just <strong>R300</strong>, you can contribute to our fund that provides 
              <strong> flights, accommodation, and meals</strong> for selected applicants. 
              Together, we can make these spiritual journeys possible.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="/contribute" 
                className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300"
              >
                Contribute Now - R300
              </a>
              <a 
                href="/apply" 
                className="px-6 py-3 border-2 border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-50 transition duration-300"
              >
                Apply For Selection
              </a>
            </div>
          </div>
          
          {/* Placeholder for image */}
          <div className="lg:w-1/2 bg-green-100 rounded-lg overflow-hidden shadow-xl">
            <div className="aspect-w-16 aspect-h-9 w-full">
              {/* In a production app, you would use an actual image */}
              <div className="w-full h-96 bg-gradient-to-r from-green-200 to-green-300 flex items-center justify-center">
                <span className="text-green-800 text-4xl font-bold">
                  Al Aqsa Mosque
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
