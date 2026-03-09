import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import type { AppUser, AuthChangeHandler } from './types';

/**
 * Firebase configuration object.
 * In a production environment, these should be populated via environment variables.
 * Fallbacks are provided for demonstration purposes to prevent immediate crashes.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

/**
 * Maps a Firebase User object to our application's AppUser interface.
 * 
 * @param user The Firebase User object or null.
 * @returns The mapped AppUser object or null.
 */
const mapFirebaseUserToAppUser = (user: User | null): AppUser | null => {
  if (!user) return null;
  
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName
  };
};

/**
 * Subscribes to Firebase authentication state changes.
 * 
 * @param callback Function to call when the authentication state changes.
 * @returns An unsubscribe function to clean up the listener.
 */
export const subscribeToAuthChanges = (callback: AuthChangeHandler): (() => void) => {
  return onAuthStateChanged(auth, (user) => {
    callback(mapFirebaseUserToAppUser(user));
  });
};

/**
 * Attempts to sign in a user with email and password.
 * 
 * @param email The user's email address.
 * @param password The user's password.
 * @returns A promise that resolves to the authenticated AppUser.
 * @throws Error if authentication fails.
 */
export const loginUser = async (email: string, password: string): Promise<AppUser> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const appUser = mapFirebaseUserToAppUser(userCredential.user);
    
    if (!appUser) {
      throw new Error("Failed to map user data after successful login.");
    }
    
    return appUser;
  } catch (error: any) {
    // Re-throw with a more user-friendly message if needed, or just pass the Firebase error
    console.error("Login error:", error.message);
    throw error;
  }
};

/**
 * Signs out the currently authenticated user.
 * 
 * @returns A promise that resolves when the user is signed out.
 */
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Logout error:", error.message);
    throw error;
  }
};