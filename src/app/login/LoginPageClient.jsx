// src/app/login/loginpageclient.jsx

"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../Components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../Components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import GoogleAuth from "../Components/Authentication/SocialAuth/GoogleAuth";
import LoginForm from "../Components/Authentication/Login/LoginForm";
import SignupForm from "../Components/Authentication/Signup/SignupForm";
import { useAuth } from "../Context/AuthContext/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPageClient() {
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState("signin");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "signup" || tab === "signin") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const tabIndicatorVariants = {
    signin: {
      x: 0,
      transition: { type: "spring", stiffness: 500, damping: 30 },
    },
    signup: {
      x: "100%",
      transition: { type: "spring", stiffness: 500, damping: 30 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-white hover:text-white/80 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        {/* Auth Card */}
        <Card className="bg-slate-900 border-white/20 p-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">
              Welcome
            </CardTitle>
            <CardDescription className="text-white/70">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>

          <div className="space-y-6">
            {/* Google OAuth */}
            <GoogleAuth isLoading={isLoading} setIsLoading={setIsLoading} />

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-white/70">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="relative w-full mb-4">
                <TabsList className="grid w-full grid-cols-2 relative bg-white/10 rounded-md overflow-hidden">
                  <TabsTrigger
                    value="signin"
                    className="text-white relative z-10"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="text-white relative z-10"
                  >
                    Sign Up
                  </TabsTrigger>

                  {/* Animated tab indicator */}
                  <motion.div
                    className="absolute top-0 left-0 h-full w-1/2 bg-primary rounded-md z-0"
                    animate={activeTab}
                    variants={tabIndicatorVariants}
                  />
                </TabsList>
              </div>

              {/* Sign In Form */}
              <TabsContent value="signin">
                <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} />
              </TabsContent>

              {/* Sign Up Form */}
              <TabsContent value="signup">
                <SignupForm isLoading={isLoading} setIsLoading={setIsLoading} />
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      </div>
    </div>
  );
}
