'use client';

import React, { useState, useRef, useEffect } from 'react';

interface OtpInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  value?: string;
  onChange?: (otp: string) => void;
  disabled?: boolean;
  error?: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({
  length = 4,
  onComplete,
  value = '',
  onChange,
  disabled = false,
  error = false
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(new Array(length).fill(null));

  // Update OTP when value prop changes
  useEffect(() => {
    if (value !== otp.join('')) {
      const newOtp = value.split('').slice(0, length);
      while (newOtp.length < length) {
        newOtp.push('');
      }
      setOtp(newOtp);
    }
  }, [value, length]);

  const handleChange = (index: number, digit: string) => {
    // Only allow single digit
    if (digit.length > 1) {
      digit = digit.slice(-1);
    }

    // Only allow numbers
    if (!/^\d*$/.test(digit)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    const otpString = newOtp.join('');
    onChange?.(otpString);

    // Auto-focus next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete when all digits are filled
    if (otpString.length === length && !otpString.includes('')) {
      onComplete(otpString);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newOtp = [...otp];
      
      if (otp[index]) {
        // Clear current cell
        newOtp[index] = '';
        setOtp(newOtp);
        onChange?.(newOtp.join(''));
      } else if (index > 0) {
        // Move to previous cell and clear it
        newOtp[index - 1] = '';
        setOtp(newOtp);
        onChange?.(newOtp.join(''));
        inputRefs.current[index - 1]?.focus();
      }
    }
    
    // Handle arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
    
    if (pastedData) {
      const digits = pastedData.split('').slice(0, length);
      const newOtp = new Array(length).fill('');
      
      digits.forEach((digit, index) => {
        newOtp[index] = digit;
      });
      
      setOtp(newOtp);
      onChange?.(newOtp.join(''));
      
      // Focus last filled input or last input
      const focusIndex = Math.min(digits.length, length - 1);
      inputRefs.current[focusIndex]?.focus();
      
      // Call onComplete if all digits are filled
      if (digits.length === length) {
        onComplete(newOtp.join(''));
      }
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={`
            w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
            transition-all duration-200
            ${error 
              ? 'border-red-300 bg-red-50 text-red-900' 
              : 'border-gray-300 bg-white text-gray-900'
            }
            ${disabled 
              ? 'bg-gray-100 cursor-not-allowed' 
              : 'hover:border-gray-400'
            }
          `}
          autoComplete="off"
        />
      ))}
    </div>
  );
};

export default OtpInput;