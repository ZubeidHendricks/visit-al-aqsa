import { auth } from '@/app/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Dashboard - Visit Al Aqsa',
  description: 'Manage your contributions and applications.',
};

export default async function DashboardPage() {
  const session = await auth();
  
  // Redirect to login if user is not authenticated
  if (!session || !session.user) {
    redirect('/login');
  }

  return (
    <div className="py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Welcome, {session.user.name}!</h1>
        
        {/* Dashboard overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-green-700 mb-2">My Contributions</h2>
            <p className="text-3xl font-bold text-green-600 mb-4">R0</p>
            <p className="text-gray-600 mb-4">You haven't made any contributions yet.</p>
            <Link
              href="/contribute"
              className="text-green-600 font-medium hover:text-green-800 transition duration-300"
            >
              Make a contribution
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-green-700 mb-2">Application Status</h2>
            <p className="text-gray-700 mb-4">You haven't applied for a journey yet.</p>
            <Link
              href="/apply"
              className="text-green-600 font-medium hover:text-green-800 transition duration-300"
            >
              Apply for a journey
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-green-700 mb-2">Account</h2>
            <p className="text-gray-700 mb-4">Manage your account settings and profile information.</p>
            <Link
              href="/dashboard/profile"
              className="text-green-600 font-medium hover:text-green-800 transition duration-300"
            >
              Edit profile
            </Link>
          </div>
        </div>
        
        {/* Recent activity */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-10">
          <h2 className="text-xl font-semibold text-green-700 mb-4">Recent Activity</h2>
          <div className="text-gray-600 text-center py-8">
            <p>No recent activity to display.</p>
          </div>
        </div>
        
        {/* Quick actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/contribute"
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300"
          >
            Make a Contribution
          </Link>
          <Link
            href="/apply"
            className="px-6 py-3 border-2 border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-50 transition duration-300"
          >
            Apply for a Journey
          </Link>
        </div>
      </div>
    </div>
  );
}
