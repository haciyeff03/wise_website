import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';

const AuthLayout = ({ children, title, subtitle, subtitleLink, subtitleLinkText }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Full-width header */}
      <div className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-10 sm:px-8 md:px-6 lg:px-10 xl:px-50 py-7 flex justify-between items-center">

          <div className="text-4xl font-bold text-green-800">
        
            <Image 
              src="/logo.svg" 
              alt="Wise" 
              width={100} 
              height={30}
              priority
            />
          </div>
          <Link href="/">
          <button className="text-[rgb(22,51,0)] hover:text-[rgb(34,77,0)]">
              <AiOutlineClose size={23} />
            </button>
          </Link>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-[550px] bg-white p-8">
          {(title || subtitle) && (
            <div className="text-center mb-8">
              {title && <h1 className="text-[28px] font-[600] mb-2">{title}</h1>}
              {subtitle && (
                <p className="text-[#454745] text-[14px]">
                  {subtitle}{' '}
                  {subtitleLink && subtitleLinkText && (
                    <Link href={subtitleLink} className="text-[rgb(22,51,0)] text-[14px] underline font-[600]">
                      {subtitleLinkText}
                    </Link>
                  )}
                </p>
              )}
            </div>
          )}
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout; 