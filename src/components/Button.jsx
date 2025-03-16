import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  fullWidth = false,
  isLoading = false,
  disabled = false
}) => {
  const baseStyles = "py-3 px-4 rounded-md font-medium transition-colors focus:outline-none";
  
  const variants = {
    primary: "bg-[#a6e06f] hover:bg-[#95cb60] text-black",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    outline: "border border-gray-300 hover:bg-gray-100 text-gray-800",
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <AiOutlineLoading3Quarters className="animate-spin mr-2 h-5 w-5" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button; 