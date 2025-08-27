"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user) {
      setUser({
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        user_metadata: session.user.user_metadata || {},
      });
    } else {
      setUser(null);
    }
  }, [session, status]);

  // console.log(user);

  const login = async (email, password) => {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    return res;
  };

  const loginWithGoogle = async () => {
    await signIn("google", { callbackUrl: "/products" });
  };

  const logout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const signup = async (email, password, name) => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to create account");
      }

      // সাইনআপের পর স্বয়ংক্রিয় লগইন
      const loginRes = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (loginRes?.error) {
        throw new Error(loginRes.error);
      }

      return { success: true };
    } catch (err) {
      return { error: err.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, loginWithGoogle, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
