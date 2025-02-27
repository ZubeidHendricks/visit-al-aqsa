import RegisterForm from '@/app/components/auth/RegisterForm';

export const metadata = {
  title: 'Register - Visit Al Aqsa',
  description: 'Create a new account on Visit Al Aqsa.'
};

export default function RegisterPage() {
  return (
    <div className="py-10 px-4">
      <div className="container mx-auto max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-4">Create Account</h1>
          <p className="text-gray-600">
            Join Visit Al Aqsa to contribute and apply for journeys to Al Aqsa.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
