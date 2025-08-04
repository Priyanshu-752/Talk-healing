// endpoints.ts
"use client";

// Mock endpoints for demonstration. Replace with real API logic.
export const loginUser = async (email: string, password: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Login successful" });
    }, 700);
  });
};

export const signupUser = async (name: string, email: string, password: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Signup successful" });
    }, 900);
  });
};
