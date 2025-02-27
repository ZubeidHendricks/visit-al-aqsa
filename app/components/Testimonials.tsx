export default function Testimonials() {
  // Mock testimonial data - in a real application, this would come from the database
  const testimonials = [
    {
      id: 1,
      content: "The journey to Al Aqsa changed my life. I never thought it would be possible for me to visit, but thanks to this incredible initiative and all the contributors, my dream became a reality.",
      author: "Fatima Ahmad",
      location: "Cape Town"
    },
    {
      id: 2,
      content: "Words cannot express my gratitude. The experience was spiritually transformative, and I'm forever thankful to everyone who contributed to make this journey possible.",
      author: "Yusuf Rahman",
      location: "Johannesburg"
    },
    {
      id: 3,
      content: "From the application process to the actual journey, everything was handled with care and professionalism. I'm now contributing monthly to help others experience what I was blessed to experience.",
      author: "Aisha Mahmoud",
      location: "Durban"
    }
  ];
  
  return (
    <section className="py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-3">Journey Testimonials</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from those who have made the journey through our initiative
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-green-800">{testimonial.author.charAt(0)}</span>
                </div>
              </div>
              
              <p className="text-gray-600 italic mb-6 text-center">
                "{testimonial.content}"
              </p>
              
              <div className="text-center">
                <p className="font-semibold text-green-700">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="/testimonials" 
            className="inline-block px-6 py-3 border-2 border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-50 transition duration-300"
          >
            Read More Stories
          </a>
        </div>
      </div>
    </section>
  );
}
