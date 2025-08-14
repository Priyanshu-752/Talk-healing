"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import { Images } from '@/public';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { useStores } from '@/models';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Form Schema
const formSchema = z.object({
  full_name: z.string().min(2, { message: 'Full name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password1: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  password2: z.string().min(6, { message: 'Password must be at least 6 characters' })
});

type FormValues = z.infer<typeof formSchema>;

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
    const router = useRouter();
    const { userStore } = useStores();
    
    // State management
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // React-Hook-Form setup
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            full_name: '',
            email: '',
            password1: '',
            password2: ''
        }
    });

    // Submission Handler
    const onSubmit = async (data: FormValues) => {
        // Check if passwords match
        if (data.password1 !== data.password2) {
            setErrorMessage('Passwords do not match');
            return;
        }

        setIsLoading(true);
        setErrorMessage('');
        
        console.log('Starting signup with data:', { 
            full_name: data.full_name, 
            email: data.email, 
            password: '***' 
        });
        
        try {
            console.log('Calling userStore.signupUser...');
            const response = await userStore.signupUser(
                data.full_name,
                data.email,
                data.password1,
                data.password2,
            );
            
            console.log('Response received:', response);
            
            if (response && response.ok) {
                console.log('Signup successful');
                setSignupSuccess(true);
                
                // Redirect to login page after successful signup
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } else {
                console.log('Signup failed, handling error...');
                if (response?.error) {
                    const errorText = typeof response.error === 'string'
                        ? response.error
                        : Object.values(response.error)[0] || 'Signup failed. Please check your information.';
                    setErrorMessage(errorText as string);
                } else {
                    setErrorMessage('Signup failed. Please check your information.');
                }
            }
        } catch (error) {
            console.error('Caught error:', error);
            
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('Connection error. Please check your network and try again.');
            }
        } finally {
            setIsLoading(false);
            console.log('Signup process completed');
        }
    };

    return (
        <>
        <div className="flex justify-center items-center min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        
        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-4xl min-h-[600px]">
            {/*left image*/}
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
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full max-w-sm flex flex-col gap-4'>
                    <h2 className='text-3xl font-semibold text-center text-slate-900 mt-3'>Sign Up</h2>

                    {/* Error and Success messages */}
                    {errorMessage && (
                        <div className="text-red-600 text-sm text-center">{errorMessage}</div>
                    )}
                    {signupSuccess && (
                        <div className="text-green-600 text-sm text-center">
                            Signup successful! Redirecting to login...
                        </div>
                    )}

                    {/*name input */}
                    <div>
                        <label htmlFor='full_name' className='block text-sm
                        font-medium text-slate-900 mb-2'>Name</label>
                        <input
                        {...form.register('full_name')}
                        type='text'
                        id='full_name'
                        disabled={isLoading}
                        className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter your name'
                        />
                        {form.formState.errors.full_name && (
                            <p className="text-xs text-red-500 mt-1">{form.formState.errors.full_name.message}</p>
                        )}
                    </div>
                    {/* Email Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-medium text-slate-700 text-sm">Email</label>
                <input
                  {...form.register('email')}
                  id="email"
                  type="email"
                  disabled={isLoading}
                  placeholder="you@example.com"
                  className="px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 transition-all outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400"
                />
                {form.formState.errors.email && (
                    <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
                )}
              </div>
               {/* Password Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="font-medium text-slate-700 text-sm">Password</label>
                <div className="relative flex items-center">
                  <input
                    {...form.register('password1')}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    disabled={isLoading}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 transition-all outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-3 text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </button>
                </div>
                {form.formState.errors.password1 && (
                    <p className="text-xs text-red-500">{form.formState.errors.password1.message}</p>
                )}
              </div>

                {/* Confirm Password Input */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="confirmpassword" className="font-medium text-slate-700 text-sm">Confirm Password</label>
                    <div className="relative flex items-center">
                        <input
                            {...form.register('password2')}
                            id="confirmpassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            disabled={isLoading}
                            placeholder="Confirm your password"
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 transition-all outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            disabled={isLoading}
                            className="absolute right-3 text-slate-500 hover:text-slate-800 transition-colors"
                        >
                            {showConfirmPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                        </button>
                    </div>
                    {form.formState.errors.password2 && (
                        <p className="text-xs text-red-500">{form.formState.errors.password2.message}</p>
                    )}
                </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg transition-all hover:bg-blue-700 hover:-translate-y-px active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing up..." : "Sign Up"}
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
