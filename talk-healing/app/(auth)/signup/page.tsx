"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import {Images} from '@/public';

const EyeOpenIcon = () => (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const EyeClosedIcon = () => (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.052 10.052 0 013.435-5.175M10 12a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21L3 3M17.75 10.25l-2.5-2.5M10 5.25A10.052 10.052 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.052 10.052 0 01-1.088 2.375" />
    </svg>
);

export default function SignUpSection() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Sign Up attempt:', { name, email, password, confirmPassword });
    };

    return (
        <>
        <div className="flex justify-center items-center min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        
        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-4xl min-h-[600px]">
            {/*left imagesection*/}
            <div className='hidden md:flex flex-1 bg-slate-100 justify-center items-center p-0'>
                <Image 
                src={Images.public_health}
                alt="Sign Up illustration"
                width={400}
                height={400}
                className="object-contain"
                />
            </div>
            {/*right form section*/}
            <div className="flex-1 flex justify-center items-center p-6 sm:p-10 lg:p-12">
                <form onSubmit={handleSubmit} className='w-full max-w-sm flex flex-col gap-4'>
                    <h2 className='text-3xl font-semibold text-center text-slate-900 mt-3'>Sign Up</h2>

                    {/*name input */}
                    <div>
                        <label htmlFor='name' className='block text-sm
                        font-medium text-slate-900 mb-2'>Name</label>
                        <input
                        type='text'
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter your name'
                        />
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

                {/* Confirm Password Input */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="confirmPassword" className="font-medium text-slate-700 text-sm">Confirm Password</label>
                    <div className="relative flex items-center">
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 transition-all outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 text-slate-500 hover:text-slate-800 transition-colors"
                        >
                            {showConfirmPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                        </button>
                    </div>
                </div>

              {/* Submit Button */}
              <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg transition-all hover:bg-blue-700 hover:-translate-y-px active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Sign Up
              </button>

              {/* Sign Up Prompt */}
              <div className="text-center text-sm text-slate-600 mt-4">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-blue-600 hover:underline">
                  Login
                </Link>
              </div>
                </form>

            </div>
            </div>
        </div>
        </>
    );
};