"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "../lib/react-query";
import { ThemeProvider } from "./Components/Home/HomeComponents/ThemeProvider";
import Navbar from "./Components/RootCompo/Navbar/Navbar";
import Footer from "./Components/RootCompo/Footer/Footer";
import { Toaster } from "./Components/ui/toaster";
import { Toaster as Sonner } from "./Components/ui/sonner";
import { TooltipProvider } from "./Components/ui/tooltip";
import { AuthProvider } from "./Context/AuthContext/AuthContext";
import { SessionProvider } from "next-auth/react";

const queryClient = getQueryClient();

export default function ClientLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="appcraft-theme">
        <SessionProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Navbar />
            <main className="antialiased">{children}</main>
            <Footer />
          </TooltipProvider>
        </AuthProvider>
        </SessionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
