export default function Footer() {
  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Visit Al Aqsa</h3>
            <p className="text-green-100 mb-4">
              A crowdfunding initiative making spiritual journeys possible.
            </p>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-green-100 hover:text-white transition duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/how-it-works" className="text-green-100 hover:text-white transition duration-300">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/contribute" className="text-green-100 hover:text-white transition duration-300">
                  Contribute
                </a>
              </li>
              <li>
                <a href="/apply" className="text-green-100 hover:text-white transition duration-300">
                  Apply
                </a>
              </li>
              <li>
                <a href="/testimonials" className="text-green-100 hover:text-white transition duration-300">
                  Testimonials
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-green-100 mb-2">
              Email: info@visitaqsa.org
            </p>
            <p className="text-green-100 mb-2">
              Phone: +27 21 000 0000
            </p>
          </div>
        </div>
        
        <div className="border-t border-green-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-green-200 text-sm">
            &copy; {new Date().getFullYear()} Visit Al Aqsa. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="/terms" className="text-green-200 text-sm hover:text-white transition duration-300">
              Terms of Service
            </a>
            <a href="/privacy" className="text-green-200 text-sm hover:text-white transition duration-300">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
