import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const OtpVerification = ({ onSuccess }: { onSuccess: () => void }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { verifyOtp } = useAuth();
  const navigate = useNavigate();

  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.charAt(0);
    }
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 4) {
      toast({
        title: "Error",
        description: "Please enter a valid OTP",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await verifyOtp(otpValue);
      if (success) {
        toast({
          title: "Success",
          description: "OTP verified successfully",
        });
        onSuccess();
      } else {
        toast({
          title: "Error",
          description: "Invalid OTP. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = () => {
    toast({
      title: "OTP Resent",
      description: "A new OTP has been sent to your phone",
    });
  };

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center">OTP Verification</h2>
      <p className="text-center text-gray-600 mb-6">
        Enter the OTP you received to verify access
      </p>

      <div className="flex justify-center gap-3 mb-8">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="otp-input"
          />
        ))}
      </div>

      <Button
        className="w-full bg-primary hover:bg-primary/90"
        size="lg"
        onClick={handleVerify}
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Verify OTP
      </Button>

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={handleResendOtp}
          className="text-primary hover:underline"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;
