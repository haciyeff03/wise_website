'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple } from 'react-icons/fa';

import Button from '@/components/Button';
import TextField from '@/components/TextField';
import AuthLayout from '@/components/AuthLayout';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    
    // Clear error when user types
    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Redirect to dashboard or home page on successful login
      router.push('/dashboard');
    } catch (error) {
      setErrors({
        form: error.message || 'An error occurred during login',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // In a real app, this would redirect to the OAuth provider
    console.log(`Login with ${provider}`);
  };

  return (
    <AuthLayout
      title="Welcome back."
      subtitle="New to Wise?"
      subtitleLink="/register"
      subtitleLinkText="Sign up"
    >
      {/* Login form */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Your email address"
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        
        <TextField
          label="Your password"
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />
        
        {errors.form && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
            {errors.form}
          </div>
        )}
        
        <div className="mt-6">
          <Button 
            type="submit" 
            variant="primary" 
            fullWidth 
            isLoading={isLoading}
          >
            Log in
          </Button>
        </div>
        
        <div className="mt-4 text-center">
          <a href="/forgot-password" className="text-[rgb(22,51,0)] underline font-medium">
            Trouble logging in?
          </a>
        </div>
      </form>
      
      {/* Social login options */}
      <div className="mt-8">
        <div className="text-center text-gray-500 mb-4">Or log in with</div>
        
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={() => handleSocialLogin('Google')}
            className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <FcGoogle size={24} />
          </button>
          
          <button 
            onClick={() => handleSocialLogin('Facebook')}
            className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <FaFacebook size={24} className="text-blue-600" />
          </button>
          
          <button 
            onClick={() => handleSocialLogin('Apple')}
            className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <FaApple size={24} />
          </button>
        </div>
      </div>
    </AuthLayout>
  );
} 