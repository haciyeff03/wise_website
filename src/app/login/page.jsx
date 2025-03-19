'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple } from 'react-icons/fa';
import { IoCloseCircleOutline } from 'react-icons/io5';
import Link from 'next/link';

import Button from '@/components/Button';
import TextField from '@/components/TextField';
import AuthLayout from '@/components/AuthLayout';
import { IoIosCloseCircle, IoMdClose } from 'react-icons/io';

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
      newErrors.email = 'Please fill this field';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Please fill this field';
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
        throw new Error("Sorry, that email or password didn't work.");
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

  const dismissError = () => {
    setErrors({});
  };

  return (
    <AuthLayout
      title="Welcome back."
      subtitle="New to Wise?"
      subtitleLink="/register"
      subtitleLinkText="Sign up"
    >
      {/* Error Message */}
      {errors.form && (
        <div className="mb-8 py-6 px-4 bg-neutral-200 rounded-2xl flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <IoIosCloseCircle className="text-[#A8200D]" size={50} />
          </div>
          <div className="flex-grow">
            <p className="text-[#2D2E2D] text-[15px] mb-1">{errors.form}</p>
            <Link href="/forgot-password" className="text-[#163300] text-[15px] font-[600] underline">
              Reset password
            </Link>
          </div>
          <button
            onClick={dismissError}
            className="flex-shrink-0 mt-1 text-[#454745] hover:text-[#2D2E2D] cursor-pointer"
          >
            <IoMdClose size={24} />
          </button>
        </div>
      )}

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

        <div className="mt-4 font-[16px] color-[#163300] text-left">
          <a href="/forgot-password" className="text-[rgb(22,51,0)] underline font-medium">
            Trouble logging in?
          </a>
        </div>
      </form>

      {/* Social login options */}
      <div className="mt-4">
        <div className="text-left text-gray-500 mb-4">Or log in with</div>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleSocialLogin('Google')}
            className="group flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md cursor-pointer 
             hover:bg-[#4285F4] hover:text-white transition"
          >
            <FcGoogle size={24} className="transition group-hover:filter group-hover:brightness-0 group-hover:invert" />
          </button>
          <button
            onClick={() => handleSocialLogin('Facebook')}
            className="group flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md cursor-pointer 
             hover:bg-[#3B5998] hover:text-white transition"
          >
            <FaFacebook size={24} className="text-blue-600 transition group-hover:filter group-hover:brightness-0 group-hover:invert" />
          </button>

          <button
            onClick={() => handleSocialLogin('Apple')}
            className="group flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md cursor-pointer 
             hover:bg-[#000000] hover:text-white transition"
          >
            <FaApple size={24} className="transition group-hover:filter group-hover:brightness-0 group-hover:invert" />
          </button>
        </div>
      </div>
    </AuthLayout>
  );
} 