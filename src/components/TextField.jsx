import React, { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { IoIosCloseCircle } from "react-icons/io";



const TextField = ({
  label,
  type = 'text',
  id,
  value,
  onChange,
  placeholder,
  error,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-[#454745] font-medium mb-2">
          {label}

        </label>
      )}
      <div className="relative">
        <input
          type={isPassword && showPassword ? 'text' : type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3  rounded-lg focus:outline-none focus:ring-1 border-2
            ${error ? 'border-[#A8200D] focus:ring-[#A8200D]' : 'border-gray-300 focus:ring-green-500'}
          `}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          >
            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-[#A8200D] flex items-center gap-1">
        <IoIosCloseCircle size={20} />
        {error}
      </p>}
    </div>
  );
};

export default TextField; 