// Import will be used later when database is connected
// import { getFundingStats } from '../db';
import Link from 'next/link';

export default async function FundingProgress() {
  // In a real application, this would fetch data from the database
  // For now, we'll use mock data until we implement the actual data fetching
  // const stats = await getFundingStats();
  
  // Mock data
  const mockStats = {
    totalRaised: 58500,
    contributorCount: 195,
    journeysFunded: 4,
    applicantsWaiting: 28,
    currentGoal: {
      target_amount: 15000,
      current_amount: 12500,
      description: 'Funding for next Al Aqsa journey'
    }
  };
  
  // Calculate progress percentage
  const progressPercentage = mockStats.currentGoal ? 
    Math.min(100, (mockStats.currentGoal.current_amount / mockStats.currentGoal.target_amount) * 100) : 0;
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `R${amount.toLocaleString()}`;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-green-800 mb-4">Fundraising Progress</h2>
      
      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <p className="text-3xl font-bold text-green-700">{formatCurrency(mockStats.totalRaised)}</p>
          <p className="text-sm text-gray-600">Total Funds Raised</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <p className="text-3xl font-bold text-green-700">{mockStats.contributorCount}</p>
          <p className="text-sm text-gray-600">Contributors</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <p className="text-3xl font-bold text-green-700">{mockStats.journeysFunded}</p>
          <p className="text-sm text-gray-600">Journeys Funded</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <p className="text-3xl font-bold text-green-700">{mockStats.applicantsWaiting}</p>
          <p className="text-sm text-gray-600">Applicants Waiting</p>
        </div>
      </div>
      
      {/* Progress bar */}
      {mockStats.currentGoal && (
        <div className="mb-2">
          <div className="flex justify-between mb-1">
            <h3 className="font-medium">Next Journey Goal</h3>
            <p className="text-sm">
              {formatCurrency(mockStats.currentGoal.current_amount)} of {formatCurrency(mockStats.currentGoal.target_amount)}
            </p>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-green-600 h-4 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-gray-600 mt-2">
            Only {formatCurrency(mockStats.currentGoal.target_amount - mockStats.currentGoal.current_amount)} more needed to fund our next applicant&apos;s journey!
          </p>
        </div>
      )}
      
      <div className="mt-6 text-center">
        <Link 
          href="/contribute" 
          className="inline-block px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300"
        >
          Contribute Now - R300
        </Link>
      </div>
    </div>
  );
}
