'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Images } from '@/public';
import { useStores } from '@/models';
import OtpInput from '@/app/componenets/otp/otpinput';

const VerifyEmailPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { userStore } = useStores();
    
    // Get email from URL params
    const email = searchParams.get('email') || '';
    
    // State management
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [resendSuccess, setResendSuccess] = useState(false);

    // Auto-clear success message
    useEffect(() => {
        if (resendSuccess) {
            const timer = setTimeout(() => setResendSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [resendSuccess]);

    // Handle OTP verification
    const handleVerifyOtp = async () => {
        if (!email) {
            setErrorMessage('Email not found. Please go back to signup.');
            return;
        }

        if (otp.length !== 4) {
            setErrorMessage('Please enter the complete 4-digit OTP code.');
            return;
        }

        setIsLoading(true);
        setErrorMessage('');
        
        try {
            const response = await userStore.verifyEmailOtp(email, otp);
            
            if (response && response.ok) {
                router.push('/login?verified=true');
            } else {
                setErrorMessage('Invalid OTP. Please try again.');
            }
        } catch (error) {
            console.error('OTP verification error:', error);
            setErrorMessage('Verification failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle resend OTP
    const handleResendOtp = async () => {
        if (!email) {
            setErrorMessage('Email not found. Please go back to signup.');
            return;
        }

        setIsResending(true);
        setErrorMessage('');
        setResendSuccess(false);
        
        try {
            const response = await userStore.resendOtp(email);
            
            if (response && response.ok) {
                setResendSuccess(true);
                setOtp('');
                setErrorMessage('');
            } else {
                setErrorMessage('Failed to resend OTP. Please try again.');
            }
        } catch (error) {
            console.error('Resend OTP error:', error);
            setErrorMessage('Failed to resend OTP. Please try again.');
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-4xl min-h-[600px]">
                
                {/* Left Image Section */}
                <div className='hidden md:flex flex-1 bg-slate-100 justify-center items-center p-8'>
                    <Image 
                        src={Images.public_health}
                        alt="Email verification illustration"
                        width={400}
                        height={400}
                        className="object-contain"
                    />
                </div>

                {/* Right Form Section */}
                <div className="flex-1 flex justify-center items-center p-6 sm:p-10 lg:p-12">
                    <div className='w-full max-w-sm flex flex-col gap-6'>
                        
                        {/* Header */}
                        <div className="text-center">
                            <h2 className='text-3xl font-semibold text-slate-900 mb-3'>
                                Verify Email Otp
                            </h2>
                            <p className="text-gray-600 text-sm mb-2">
                                We have sent the Otp in your email. Please enter the Otp for the verification.
                            </p>
                            {email && (
                                <p className="text-gray-500 text-xs">
                                    Sent to: {email}
                                </p>
                            )}
                        </div>

                        {/* Error and Success Messages */}
                        {errorMessage && (
                            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                                {errorMessage}
                            </div>
                        )}
                        
                        {resendSuccess && (
                            <div className="text-green-600 text-sm text-center bg-green-50 p-3 rounded-lg">
                                OTP has been resent to your email!
                            </div>
                        )}

                        {/* OTP Input */}
                        <div className="flex flex-col items-center gap-6">
                            <OtpInput
                                length={4}
                                value={otp}
                                onChange={setOtp}
                                onComplete={setOtp}
                                disabled={isLoading}
                                error={!!errorMessage}
                            />

                            {/* Resend Link */}
                            <div className="text-center">
                                <span className="text-gray-600 text-sm">
                                    Didn't get the code?{' '}
                                </span>
                                <button
                                    type="button"
                                    onClick={handleResendOtp}
                                    disabled={isResending}
                                    className="text-green-600 text-sm font-medium hover:text-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isResending ? 'Sending...' : 'Resend Code'}
                                </button>
                            </div>
                        </div>

                        {/* Continue Button */}
                        <button
                            type="button"
                            onClick={handleVerifyOtp}
                            disabled={isLoading || otp.length !== 4}
                            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium
                                     hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                                     disabled:bg-gray-300 disabled:cursor-not-allowed
                                     transition-colors duration-200"
                        >
                            {isLoading ? 'Verifying...' : 'Continue'}
                        </button>

                        {/* Back to Sign Up Link */}
                        <div className="text-center">
                            <Link 
                                href="/signup" 
                                className="text-gray-600 text-sm hover:text-gray-800 hover:underline"
                            >
                                Back to Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmailPage;