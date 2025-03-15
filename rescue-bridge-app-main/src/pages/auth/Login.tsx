import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import OtpVerification from "@/components/auth/OtpVerification";

const Login = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [step, setStep] = useState<"login" | "otp">("login");

  const getRoleTitle = () => {
    switch (role) {
      case "victim":
        return "Victim";
      case "organization":
        return "Organization";
      case "rescuer":
        return "Rescue Volunteer";
      case "admin":
        return "Admin";
      default:
        return "User";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (role) {
      try {
        // For demo purposes, proceed to OTP verification
        setStep("otp");
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to login. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleOtpSuccess = async () => {
    if (role) {
      const success = await login(email, password, role as any);
      if (success) {
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Error",
          description: "Login failed. Please try again.",
          variant: "destructive",
        });
        setStep("login");
      }
    }
  };

  if (step === "otp") {
    return <OtpVerification onSuccess={handleOtpSuccess} />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-50">
      <div className="max-w-md mx-auto w-full p-6 bg-white rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login as {getRoleTitle()}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder={`${getRoleTitle().toLowerCase()}@floodrelief.org`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => 
                setRememberMe(checked === true)
              }
            />
            <Label htmlFor="remember">Keep me signed in</Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Login
          </Button>
        </form>

        {role !== "admin" && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to={`/auth/${role}/register`}
                className="text-primary hover:underline"
              >
                Create new account
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
