"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import {
  auth,
  googleProvider,
  isFirebaseConfigured,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "./firebase";
import toast from "react-hot-toast";

const getApiUrl = () => {
  const url = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000";
  return url.replace("localhost", "127.0.0.1");
};
const API_BASE = getApiUrl();

interface AuthContextType {
  user: any;
  profile: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string, username: string) => Promise<any>;
  loginWithGoogle: () => Promise<any>;
  logout: () => Promise<void>;
  updateUserProfile: (updatedData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
  updateUserProfile: async () => {},
});

const formatAuthErrorMessage = (errorMsg: string): string => {
  const msg = errorMsg || "";
  
  if (msg.includes("Database is closing") || msg.includes("IndexedDB") || msg.includes("closing/hidden")) {
    return "Redirecting to Google Sign-In...";
  }
  if (msg.includes("user-not-found") || msg.includes("user_not_found")) {
    return "No account found with this email address. Please check your email or create an account.";
  }
  if (msg.includes("wrong-password") || msg.includes("invalid-credential") || msg.includes("invalid-password")) {
    return "Incorrect password. Please verify your credentials and try again.";
  }
  if (msg.includes("email-already-in-use")) {
    return "An account with this email address already exists. Please sign in instead.";
  }
  if (msg.includes("invalid-email")) {
    return "Please enter a valid email address.";
  }
  if (msg.includes("weak-password")) {
    return "Password is too weak. Please use at least 6 characters.";
  }
  if (msg.includes("email-not-verified")) {
    return "Please verify your email address. A verification link has been sent to your inbox.";
  }

  return msg
    .replace(/^Firebase:\s*/i, "")
    .replace(/^Error:\s*/i, "")
    .replace(/^auth\/[a-z-]+:\s*/i, "")
    .trim();
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Sync profile details with backend database
  const syncProfileWithBackend = async (firebaseUser: any, usernameVal: string | null = null) => {
    try {
      const getRes = await fetch(`${API_BASE}/api/customers/${firebaseUser.uid}`);
      if (getRes.ok) {
        const text = await getRes.text();
        const data = text ? JSON.parse(text) : null;
        const customer = data?.customer || data;

        if (customer && customer.id) {
          setProfile(customer);
          return customer;
        }
      }

      // Customer not registered yet -> Create customer record
      const createRes = await fetch(`${API_BASE}/api/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebaseId: firebaseUser.uid,
          email: firebaseUser.email,
          username: usernameVal || firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Customer",
          phone: "",
          addresses: [],
        }),
      });
      if (createRes.ok) {
        const createdText = await createRes.text();
        const createdData = createdText ? JSON.parse(createdText) : null;
        setProfile(createdData);
        return createdData;
      }
    } catch (err) {
      console.error("Failed to sync customer profile with backend:", err);
    }
    return null;
  };

  useEffect(() => {
    if (isFirebaseConfigured) {
      getRedirectResult(auth).then(async (result: any) => {
        if (result?.user) {
          setUser(result.user);
          const dbProfile = await syncProfileWithBackend(result.user);
          toast.success(`Welcome, ${dbProfile?.username || result.user.displayName || "customer"}!`);
        }
      }).catch((e: any) => {
        console.warn("Redirect auth result error:", e);
      });
    }

    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser: any) => {
      if (firebaseUser) {
        if (isFirebaseConfigured && !firebaseUser.emailVerified && firebaseUser.providerData?.[0]?.providerId === "password") {
          setUser(null);
          setProfile(null);
          setLoading(false);
          return;
        }
        setUser(firebaseUser);
        await syncProfileWithBackend(firebaseUser);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      let res: any;
      if (isFirebaseConfigured) {
        res = await signInWithEmailAndPassword(auth, email, password);
        if (!res.user.emailVerified) {
          await sendEmailVerification(res.user);
          await signOut(auth);
          throw new Error("auth/email-not-verified: Please verify your email address. A verification link has been sent.");
        }
      } else {
        res = await auth.signInWithEmailAndPassword(email, password);
      }
      const dbProfile = await syncProfileWithBackend(res.user);
      toast.success(`Welcome back, ${dbProfile?.username || "customer"}!`);
      return res.user;
    } catch (err: any) {
      toast.error(formatAuthErrorMessage(err.message));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, username: string) => {
    setLoading(true);
    try {
      let res: any;
      if (isFirebaseConfigured) {
        res = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(res.user, { displayName: username });
        await sendEmailVerification(res.user);
        await syncProfileWithBackend(res.user, username);
        await signOut(auth);
        toast.success("Verification email sent! Please verify your email address before signing in.", { duration: 6000 });
      } else {
        res = await auth.createUserWithEmailAndPassword(email, password);
        await syncProfileWithBackend(res.user, username);
        toast.success("Account created successfully!");
      }
      return res?.user || null;
    } catch (err: any) {
      toast.error(formatAuthErrorMessage(err.message));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      if (isFirebaseConfigured) {
        const res = await signInWithPopup(auth, googleProvider);
        if (res?.user) {
          setUser(res.user);
          const dbProfile = await syncProfileWithBackend(res.user);
          toast.success(`Welcome, ${dbProfile?.username || res.user.displayName || "customer"}!`);
          return res.user;
        }
      } else {
        const res = await auth.signInWithGoogle();
        setUser(res.user);
        const dbProfile = await syncProfileWithBackend(res.user);
        toast.success(`Welcome, ${dbProfile?.username || res.user.displayName || "customer"}!`);
        return res.user;
      }
    } catch (err: any) {
      console.error("🔥 [GOOGLE AUTH ERROR]:", err);
      if (err.code === "auth/operation-not-allowed") {
        toast.error("Google Sign-In is disabled in Firebase Console. Please enable Google under Firebase -> Authentication -> Sign-in method.");
      } else if (err.code !== "auth/popup-closed-by-user" && !err.message?.includes("Database is closing/hidden")) {
        toast.error(formatAuthErrorMessage(err.message));
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      if (isFirebaseConfigured) {
        await signOut(auth);
      } else {
        await auth.signOut();
      }
      setUser(null);
      setProfile(null);
      toast.success("Signed out successfully.");
    } catch (err: any) {
      toast.error(formatAuthErrorMessage(err.message));
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (updatedData: any) => {
    if (!user) return;
    try {
      if (isFirebaseConfigured && auth.currentUser) {
        if (updatedData.username) {
          await updateProfile(auth.currentUser, { displayName: updatedData.username });
        }
      } else if (auth.updateProfile) {
        await auth.updateProfile(updatedData);
      }

      const res = await fetch(`${API_BASE}/api/customers/${user.uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: updatedData.username,
          phone: updatedData.phone,
          addresses: updatedData.addresses,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setUser((prev: any) => ({ ...prev, displayName: updatedData.username || prev.displayName }));
        toast.success("Profile updated successfully!");
      }
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error("Failed to update profile details.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        login,
        signup,
        loginWithGoogle,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
