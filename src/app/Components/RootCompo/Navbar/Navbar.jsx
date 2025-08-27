// src/app/components/rootcompo/footer/navbar.jsx

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Sun, Moon, ShoppingBag, User, LogOut } from "lucide-react";
import { Button } from "../../ui/button";
import { useTheme } from "../../Home/HomeComponents/ThemeProvider";
import { useAuth } from "../../../Context/AuthContext/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const profileRef = useRef(null);
  const router = useRouter();

  // Mark component as mounted (client)
  useEffect(() => setMounted(true), []);

  // Close profile sidebar on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileRef]);

  const handleSignOut = async () => {
    try {
      await logout();
      setIsProfileOpen(false);
      setIsOpen(false);
    } catch (err) {
      // console.error(err);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
  ];

  return (
    <nav className="bg-background/70 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-primary" />
            <span className="gradient-text text-xl font-bold">NextShop</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Dashboard link only on client after mount */}
            {mounted && user && (
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/dashboard"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Dashboard
              </Link>
            )}

            {/* Theme Toggle */}
            <button
              className="btn btn-ghost"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </button>

            {/* Auth / Profile Sidebar */}
            {mounted &&
              !loading &&
              (user ? (
                <div className="relative" ref={profileRef}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2"
                  >
                    <User className="w-12 h-12" />
                  </Button>

                  {/* Profile Sidebar */}
                  <div
                    className={`fixed top-16 right-0 w-64 h-fit bg-card shadow-md transition-all duration-300 ease-in-out z-50 bg-base-300 rounded-xl ${
                      isProfileOpen
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="p-4 border-b">
                      <h2 className="text-lg font-semibold">
                        {user.user_metadata?.display_name ||
                          user.email.split("@")[0]}
                      </h2>
                    </div>
                    <div className="flex flex-col p-4 space-y-2">
                      <Link
                        href="/dashboard"
                        className="px-4 py-2 text-sm hover:bg-base-100 rounded-md"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Button onClick={handleSignOut} variant="hero">
                        Logout <LogOut className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href="/login">
                  <Button variant="hero" size="sm">
                    Sign In
                  </Button>
                </Link>
              ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && mounted && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card/50 backdrop-blur-sm border-t border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {user && (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 rounded-md"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-sm bg-gradient-hero rounded-md text-white"
                >
                  <LogOut className="inline w-4 h-4 mr-1" /> Logout
                </button>
              </>
            )}

            {!user && (
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="hero" className="w-full">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
