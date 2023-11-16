import React, { createContext, useContext, useEffect, useState } from "react";
import app from "./../firebase/firebase.config";
import {
  UserCredential,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword as signIn,
  signOut as signOutFirebase,
  createUserWithEmailAndPassword as signUp,
} from "firebase/auth";
import { updateProfile } from "firebase/auth/cordova";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: UserCredential | null;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  signOut: () => void;
  signUpWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  updateUserProfile: (name: string) => Promise<void>;
}

const auth = getAuth(app);

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserCredential | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // Create a simplified UserCredential object
        const userCredential: UserCredential = {
          user: authUser,
          // Additional properties specific to UserCredential
          providerId: "", // This may vary based on your authentication providers
          operationType: "signIn", // or 'signIn' based on your use case
        };

        setIsAuthenticated(true);
        setUser(userCredential);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // signIn
  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      const userCredential = await signIn(auth, email, password);
      setUser(userCredential);
    } catch (error) {
      console.error("Sign in error:", error);
      throw new Error("Sign in failed");
    }
  };

  //sign out
  const signOut = () => {
    signOutFirebase(auth);
  };

  //sign up
  const signUpWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      const userCredential = await signUp(auth, email, password);
      setUser(userCredential);
    } catch (error) {
      console.error("Sign up error:", error);
      throw new Error("Sign up failed");
    }
  };

  //update user profile
  const updateUserProfile = (name: string) => {
    return updateProfile(auth.currentUser!, {
      displayName: name,
    });
  };

  // value
  const contextValue: AuthContextProps = {
    isAuthenticated,
    user,
    signInWithEmailAndPassword,
    signOut,
    signUpWithEmailAndPassword,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
