import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyD89aN5UJB9TgR0zNvygjjaRI-1uSGieQ4",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "jewellry-garden.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "jewellry-garden",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "jewellry-garden.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "381528213639",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:381528213639:web:7d090c4f534ed38ac3d022",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-KQB5S7WNFF",
};

// Check if valid firebase config keys exist
const isFirebaseConfigured =
  typeof process !== "undefined" &&
  Boolean(firebaseConfig.apiKey) &&
  firebaseConfig.apiKey !== "placeholder";

let app: any = null;
let auth: any = null;
let analytics: any = null;
const googleProvider = new GoogleAuthProvider();

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);

    if (typeof window !== "undefined") {
      setPersistence(auth, browserLocalPersistence).catch((err) => {
        console.warn("Failed to set auth persistence:", err);
      });

      isSupported().then((yes) => {
        if (yes) analytics = getAnalytics(app);
      });
    }
  } catch (err) {
    console.warn("Failed to initialize Firebase Auth:", err);
  }
}

// Fallback to simulated local mock Auth service if Firebase is not fully configured
if (!auth) {
  if (typeof window !== "undefined") {
    console.log("Firebase not configured. Running Jewellery Garden authentication service.");
  }

  auth = {
    currentUser: null,
    listeners: [] as Array<(user: any) => void>,
    onAuthStateChanged(callback: (user: any) => void) {
      this.listeners.push(callback);
      const savedUser = typeof window !== "undefined" ? localStorage.getItem("jg-current-user") : null;
      const parsedUser = savedUser ? JSON.parse(savedUser) : null;
      this.currentUser = parsedUser;

      setTimeout(() => {
        callback(parsedUser);
      }, 0);

      return () => {
        this.listeners = this.listeners.filter((l: any) => l !== callback);
      };
    },
    async signInWithEmailAndPassword(email: string, password: string) {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const savedCustomers = typeof window !== "undefined" ? localStorage.getItem("jg-mock-customers") : null;
      let customersList = savedCustomers ? JSON.parse(savedCustomers) : [];

      if (customersList.length === 0) {
        customersList = [
          {
            uid: "jg-uid-bsouvik986",
            email: "bsouvik986@gmail.com",
            password: "@SouvikBasu@627",
            displayName: "Souvik Basu",
            emailVerified: true,
          },
          {
            uid: "jg-uid-admin",
            email: "admin@jewellerygardenpvtltd.com",
            password: "Admin@Garden2026!",
            displayName: "Master Admin",
            emailVerified: true,
          },
        ];
        if (typeof window !== "undefined") {
          localStorage.setItem("jg-mock-customers", JSON.stringify(customersList));
        }
      }

      const found = customersList.find((c: any) => c.email.toLowerCase() === email.toLowerCase());

      if (!found) {
        throw new Error("No account found with this email address. Please check your email or create an account first.");
      }

      if (found.password && found.password !== password) {
        throw new Error("Incorrect password. Please verify your credentials and try again.");
      }

      const user = {
        uid: found.uid,
        email: found.email,
        displayName: found.displayName || found.email.split("@")[0],
        emailVerified: true,
      };

      this.currentUser = user;
      if (typeof window !== "undefined") {
        localStorage.setItem("jg-current-user", JSON.stringify(user));
      }
      this.listeners.forEach((l: any) => l(user));
      return { user };
    },
    async createUserWithEmailAndPassword(email: string, password: string) {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const savedCustomers = typeof window !== "undefined" ? localStorage.getItem("jg-mock-customers") : null;
      let customersList = savedCustomers ? JSON.parse(savedCustomers) : [];

      const exists = customersList.some((c: any) => c.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        throw new Error("An account with this email address already exists. Please sign in instead.");
      }

      const uid = "jg-uid-" + Math.random().toString(36).substring(2, 11);
      const newCust = {
        uid,
        email: email.toLowerCase(),
        password,
        displayName: email.split("@")[0],
        emailVerified: true,
      };

      customersList.push(newCust);
      if (typeof window !== "undefined") {
        localStorage.setItem("jg-mock-customers", JSON.stringify(customersList));
      }

      const user = {
        uid: newCust.uid,
        email: newCust.email,
        displayName: newCust.displayName,
        emailVerified: true,
      };

      this.currentUser = user;
      if (typeof window !== "undefined") {
        localStorage.setItem("jg-current-user", JSON.stringify(user));
      }
      this.listeners.forEach((l: any) => l(user));
      return { user: user };
    },
    async signInWithGoogle() {
      await new Promise((resolve) => setTimeout(resolve, 400));
      const user = {
        uid: "jg-uid-bsouvik986",
        email: "bsouvik986@gmail.com",
        displayName: "Souvik Basu",
        emailVerified: true,
      };

      this.currentUser = user;
      if (typeof window !== "undefined") {
        localStorage.setItem("jg-current-user", JSON.stringify(user));
      }
      this.listeners.forEach((l: any) => l(user));
      return { user };
    },
    async signOut() {
      await new Promise((resolve) => setTimeout(resolve, 300));
      this.currentUser = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("jg-current-user");
      }
      this.listeners.forEach((l: any) => l(null));
    },
    async updateProfile(profileUpdates: any) {
      if (!this.currentUser) return;

      const updatedUser = { ...this.currentUser, ...profileUpdates };
      this.currentUser = updatedUser;
      if (typeof window !== "undefined") {
        localStorage.setItem("jg-current-user", JSON.stringify(updatedUser));
      }

      const savedCustomers = typeof window !== "undefined" ? localStorage.getItem("jg-mock-customers") : null;
      if (savedCustomers) {
        const list = JSON.parse(savedCustomers);
        const index = list.findIndex((c: any) => c.uid === updatedUser.uid);
        if (index !== -1) {
          list[index] = { ...list[index], ...profileUpdates };
          if (typeof window !== "undefined") {
            localStorage.setItem("jg-mock-customers", JSON.stringify(list));
          }
        }
      }

      this.listeners.forEach((l: any) => l(updatedUser));
    },
  };
}

export {
  app,
  auth,
  analytics,
  googleProvider,
  isFirebaseConfigured,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
};
