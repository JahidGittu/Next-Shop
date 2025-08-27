// src/app/api/auth/socialauth/googleauth.jsx
"use client";

import { Button } from "../../ui/button";
import { signIn } from "next-auth/react";
import { useToast } from "../../../../hooks/use-toast";

export default function GoogleAuth() {
  const { toast } = useToast();

  const handleGoogleAuth = async () => {
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Google sign-in failed",
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={handleGoogleAuth} variant="glass" className="w-full">
      Continue with Google
    </Button>
  );
}
