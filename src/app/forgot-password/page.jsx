'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@/components/Button';
import TextField from '@/components/TextField';
import AuthLayout from '@/components/AuthLayout';

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset link');
      }
      
      setIsSubmitted(true);
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center">
        {/* Key Image */}
        <div className="w-64 h-64 mb-6 relative">
          <Image 
            src="/images/key.webp" 
            alt="Key" 
            width={256} 
            height={256}
            priority
          />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Reset password</h1>
        
        {isSubmitted ? (
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to {email}
            </p>
            <Link href="/login">
              <Button variant="primary" fullWidth>
                Back to login
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <p className="text-gray-600 text-center mb-8 max-w-md">
              Just enter the email address you registered with and we'll send you a link to reset your password.
            </p>
            
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Enter your email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className={`
                    w-full px-4 py-3 border-2 rounded-md focus:outline-none focus:ring-1
                    ${error ? 'border-[#A8200D] focus:ring-[#A8200D]' : 'border-gray-300 focus:ring-green-500'}
                  `}
                />
                {error && <p className="mt-1 text-sm text-[#A8200D]">{error}</p>}
              </div>
              
              <div className="mb-6">
                <Button 
                  type="submit" 
                  variant="primary" 
                  fullWidth 
                  isLoading={isLoading}
                >
                  Send password reset link
                </Button>
              </div>
            </form>
            
            <div className="text-center text-gray-600">
              Need help? Read this <Link href="/help" className="text-green-800 underline font-medium">Help Centre article.</Link>
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  );
} 