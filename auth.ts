import { signInAnonymously } from "firebase/auth";
import { auth } from "./firebaseConfig";

export async function login(): Promise<boolean> {
  try {
    await signInAnonymously(auth);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export function getUserId(): string {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not signed in.");
  }

  return user.uid;
}