import LoginForm from '@/app/components/auth/LoginForm';

export const metadata = {
  title: 'Login - Visit Al Aqsa',
  description: 'Sign in to your Visit Al Aqsa account.'
};

export default function LoginPage() {
  return (
    <div className="py-10 px-4">
      <div className="container mx-auto max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-4">Sign In</h1>
          <p className="text-gray-600">
            Access your Visit Al Aqsa account to track your contributions and applications.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
