"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import ForgotPasswordDialog from '@/app/componenets/forgotpassword/forgotpass';
import { Images } from '@/public';
import { useRouter } from 'next/navigation';


// ICON COMPONENTS
const GoogleIcon = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.45c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89H8.169v-2.89H10.438V9.62c0-2.268 1.35-3.524 3.42-3.524 0.982 0 1.815 0.073 2.06 0.106v2.44h-1.45c-1.1 0-1.313 0.524-1.313 1.288v1.597h2.72l-0.352 2.89H14.155V21.879A10.001 10.001 0 0 0 22 12z" />
  </svg>
);

const EyeOpenIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeClosedIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.052 10.052 0 013.435-5.175M10 12a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21L3 3M17.75 10.25l-2.5-2.5M10 5.25A10.052 10.052 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.052 10.052 0 01-1.088 2.375" />
  </svg>
);

export default function LoginSection() {
  const router = useRouter();
 
  // ALL Hooks are here, inside the function!
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    // Add your login logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-4xl min-h-[600px]">
        {/* Left side - image */}
        <div className="hidden md:flex flex-1 bg-slate-100 justify-center items-center p-0">
          <Image
            src={Images.public_health}
            alt="Login illustration"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>
        {/* Right side - Login Form */}
        <div className="flex-1 flex justify-center items-center p-6 sm:p-10 lg:p-12">
          <form onSubmit={handleSubmit} className='w-full max-w-sm flex flex-col gap-6'>
            <h2 className="text-3xl font-semibold text-center text-slate-900 mb-6">
              Login to your account
            </h2>
            {/* Login Buttons */}
            <div className="flex justify-center gap-4 mb-4">
              <button type="button" className="w-12 h-12 bg-white border border-slate-300 rounded-full flex items-center justify-center cursor-pointer transition-all hover:-translate-y-px hover:shadow-md">
                <GoogleIcon />
              </button>
              <button type="button" className="w-12 h-12 bg-[#1877F2] rounded-full flex items-center justify-center cursor-pointer transition-all hover:-translate-y-px hover:shadow-lg hover:shadow-[#1877f2]/30">
                <FacebookIcon />
              </button>
            </div>
            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium text-slate-700 text-sm">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 transition-all outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400"
                required
              />
            </div>
            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-medium text-slate-700 text-sm">Password</label>
              <div className="relative flex items-center">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 transition-all outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-500 hover:text-slate-800 transition-colors"
                >
                  {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </button>
              </div>
            </div>
            {/* Forgot Password Modal Button */}
            <div className="flex justify-end -mt-1 mb-2">
              <ForgotPasswordDialog onClose={() => {}} />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg transition-all hover:bg-blue-700 hover:-translate-y-px active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Log In
            </button>
            {/* Sign Up Prompt */}
            <div className="text-center text-sm text-slate-600 mt-4">
              Don't have an account?{' '}
              <Link href="/signup" className="font-semibold text-blue-600 hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
