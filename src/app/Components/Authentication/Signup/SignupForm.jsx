// src/app/api/auth/signup/signupform.jsx

"use client";

import { useState, Fragment, useEffect } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { Mail, Lock, Eye, EyeOff, User, TrendingUp } from "lucide-react";
import { useToast } from "../../../../hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  // Password validation state
  const [passwordValidation, setPasswordValidation] = useState({
    hasNumber: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasSpecialChar: false,
    isLongEnough: false,
  });

  // Handle password input and validate rules
  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);

    setPasswordValidation({
      hasNumber: /\d/.test(pwd),
      hasUpperCase: /[A-Z]/.test(pwd),
      hasLowerCase: /[a-z]/.test(pwd),
      hasSpecialChar: /[^\w\s]/.test(pwd),
      isLongEnough: pwd.length >= 6,
    });
  };

  const handleFocus = () => setIsPasswordFocused(true);
  const handleBlur = () => setIsPasswordFocused(false);

  // Signup handler

  const handleSignup = async () => {
    try {
      if (!name || !email || !password || !confirmPassword) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        return;
      }

      if (password !== confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords don't match",
          variant: "destructive",
        });
        return;
      }

      if (!Object.values(passwordValidation).every(Boolean)) {
        toast({
          title: "Error",
          description: "Password does not meet all requirements",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);

      // Call API to create user
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create account");
      }

      toast({
        title: "Success!",
        description: "Account created successfully!",
      });

      // ✅ Redirect to login with tab=signin
      router.push("/login?tab=signin");

      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center text-white mb-2">
        Please sign up to continue
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label>Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
          <Input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label>Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label>Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            value={password}
            onChange={handlePasswordChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Password Rules */}
        <AnimatePresence>
          {isPasswordFocused && (
            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-white/70 text-sm mt-2 list-disc list-inside space-y-1"
            >
              <li
                style={{
                  color: passwordValidation.hasUpperCase
                    ? "lightgreen"
                    : "salmon",
                }}
              >
                {passwordValidation.hasUpperCase ? "✔" : "✘"} At least one
                uppercase
              </li>
              <li
                style={{
                  color: passwordValidation.hasLowerCase
                    ? "lightgreen"
                    : "salmon",
                }}
              >
                {passwordValidation.hasLowerCase ? "✔" : "✘"} At least one
                lowercase
              </li>
              <li
                style={{
                  color: passwordValidation.hasNumber ? "lightgreen" : "salmon",
                }}
              >
                {passwordValidation.hasNumber ? "✔" : "✘"} At least one number
              </li>
              <li
                style={{
                  color: passwordValidation.hasSpecialChar
                    ? "lightgreen"
                    : "salmon",
                }}
              >
                {passwordValidation.hasSpecialChar ? "✔" : "✘"} At least one
                special character
              </li>
              <li
                style={{
                  color: passwordValidation.isLongEnough
                    ? "lightgreen"
                    : "salmon",
                }}
              >
                {passwordValidation.isLongEnough ? "✔" : "✘"} Minimum 6
                characters
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label>Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
          <Input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
      </div>

      {/* Submit */}
      <Button
        onClick={handleSignup}
        disabled={isLoading}
        variant="hero"
        className="w-full"
      >
        {isLoading ? "Creating account..." : "Sign Up"}
      </Button>
    </div>
  );
}
