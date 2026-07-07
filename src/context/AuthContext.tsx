"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

// Define User Interface
export interface AuthUser {
  uid: string;
  email: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const isMockFirebase = process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.startsWith("mock-");

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isMockFirebase) {
      // ─── MOCK SESSION FALLBACK (Local Storage) ───
      const stored = localStorage.getItem("thoram_mock_session");
      if (stored) {
        setUser(JSON.parse(stored));
      }
      setLoading(false);
      return;
    }

    // ─── REAL FIREBASE AUTH ───
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        setUser({ uid: fbUser.uid, email: fbUser.email });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    if (isMockFirebase) {
      // Mock login validation
      const usersRaw = localStorage.getItem("thoram_mock_users") || "[]";
      const users = JSON.parse(usersRaw) as Array<{ email: string; pass: string; uid: string }>;
      
      const matched = users.find((u) => u.email === email && u.pass === pass);
      if (!matched) {
        throw new Error("Invalid email or password (Mock Mode)");
      }
      
      const sessionUser = { uid: matched.uid, email: matched.email };
      setUser(sessionUser);
      localStorage.setItem("thoram_mock_session", JSON.stringify(sessionUser));
      return;
    }

    // Real Firebase Login
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signup = async (email: string, pass: string) => {
    if (isMockFirebase) {
      const usersRaw = localStorage.getItem("thoram_mock_users") || "[]";
      const users = JSON.parse(usersRaw) as Array<{ email: string; pass: string; uid: string }>;
      
      if (users.find((u) => u.email === email)) {
        throw new Error("Email already registered (Mock Mode)");
      }

      const newUser = {
        uid: `mock-uid-${Math.random().toString(36).substr(2, 9)}`,
        email,
        pass,
      };

      users.push(newUser);
      localStorage.setItem("thoram_mock_users", JSON.stringify(users));

      const sessionUser = { uid: newUser.uid, email: newUser.email };
      setUser(sessionUser);
      localStorage.setItem("thoram_mock_session", JSON.stringify(sessionUser));
      return;
    }

    // Real Firebase Signup
    await createUserWithEmailAndPassword(auth, email, pass);
  };

  const logout = async () => {
    if (isMockFirebase) {
      setUser(null);
      localStorage.removeItem("thoram_mock_session");
      return;
    }

    // Real Firebase Logout
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
