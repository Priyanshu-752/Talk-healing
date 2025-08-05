import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { MdEmail } from "react-icons/md";

export default function ForgotPasswordDialog({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEmailValid = email.trim().length > 0 && email.includes("@");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid) return;
    setIsSubmitting(true);

    // Simulate async action (replace this with your API logic)
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      onClose();
      alert("Reset link sent (simulated)!");
    }, 1200);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-4 py-2 bg-blue-500 text-white rounded-full font-medium transition hover:scale-105 hover:bg-blue-600">
          Forgot Password?
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogDescription>
            Enter your email and we'll send you a password reset link.
          </DialogDescription>
        </DialogHeader>
        {/* Form content */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <div className="relative">
            <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email address"
              className="bg-gray-50 border border-gray-300 rounded-lg py-2 pl-10 pr-4 w-full text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
              disabled={isSubmitting}
            />
          </div>
          <Button
            type="submit"
            className={`px-5 py-2 rounded-full font-bold transition-colors duration-200 ${
              !isEmailValid || isSubmitting
                ? "bg-blue-300 text-white cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={!isEmailValid || isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
