'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple } from 'react-icons/fa';

import Button from '@/components/Button';
import AuthLayout from '@/components/AuthLayout';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = () => {
    if (!email) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail()) return;

    setIsLoading(true);

    try {
      // In a real app, this would check if the email exists and then proceed
      // For now, we'll just simulate a delay and redirect to the next step
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store email in session storage to use in the next step
      sessionStorage.setItem('registerEmail', email);

      // Redirect to the next step of registration
      router.push('/register/create-password');
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    // In a real app, this would redirect to the OAuth provider
    console.log(`Sign up with ${provider}`);
  };

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h1 className="text-[28px] font-[600] mb-2">Create your Wise account</h1>
        <p className="text-[#454745]">
          Already have an account? <Link href="/login" className="text-[#163300] underline font-medium">Log in</Link>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="email" className="block text-[#454745] font-medium mb-2">
            First, enter your email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            className={`
              w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1
              ${error ? ' border-[#A8200D] focus:ring-[#A8200D]' : 'border-gray-300 focus:ring-green-500'}
            `}
          />
          {error && <p className="mt-1  text-[15px] text-[#A8200D]">{error}</p>}
        </div>

        <div className="mb-8">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
          >
            Next
          </Button>
        </div>
      </form>

      <div className="mb-8">
        <div className="text-center text-gray-500 mb-4">Or sign up with</div>

        <div className="grid grid-cols-3 gap-3">

          <button
            onClick={() => handleSocialSignup('Google')}
            className="group flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md cursor-pointer 
             hover:bg-[#4285F4] hover:text-white transition"
          >
            <FcGoogle size={24} className="transition group-hover:filter group-hover:brightness-0 group-hover:invert" />
          </button>
          <button
            onClick={() => handleSocialSignup('Facebook')}
            className="group flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md cursor-pointer 
             hover:bg-[#3B5998] hover:text-white transition"
          >
            <FaFacebook size={24} className="text-blue-600 transition group-hover:filter group-hover:brightness-0 group-hover:invert" />
          </button>

          <button
            onClick={() => handleSocialSignup('Apple')}
            className="group flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md cursor-pointer 
             hover:bg-[#000000] hover:text-white transition"
          >
            <FaApple size={24} className="transition group-hover:filter group-hover:brightness-0 group-hover:invert" />
          </button>


        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        By registering, you accept our <Link href="/register" className="text-[#163300] font-[600] text-[14px] underline">Terms of use</Link> and <Link href="/register" className="text-[#163300] font-[600] text-[14px] underline">Privacy Policy</Link>
      </div>
    </AuthLayout>
  );
} 