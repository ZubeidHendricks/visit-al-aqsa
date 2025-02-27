import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-green-800 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and site name */}
          <Link href="/" className="text-xl font-bold flex items-center">
            Visit Al Aqsa
          </Link>
          
          {/* Navigation links */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-green-200 transition duration-300">
              Home
            </Link>
            <Link href="/how-it-works" className="hover:text-green-200 transition duration-300">
              How It Works
            </Link>
            <Link href="/queue" className="hover:text-green-200 transition duration-300">
              Queue Status
            </Link>
            <Link href="/contribute" className="hover:text-green-200 transition duration-300">
              Contribute
            </Link>
            <Link href="/apply" className="hover:text-green-200 transition duration-300">
              Apply
            </Link>
          </div>
          
          {/* Authentication buttons */}
          <div className="flex items-center space-x-3">
            <Link href="/login" className="px-3 py-1 text-sm border border-green-200 rounded hover:bg-green-700 transition duration-300">
              Login
            </Link>
            <Link href="/register" className="px-3 py-1 text-sm bg-green-600 rounded hover:bg-green-500 transition duration-300">
              Register
            </Link>
            
            {/* Mobile menu button - hidden on desktop */}
            <button className="md:hidden focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
