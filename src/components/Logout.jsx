import { signOut } from "firebase/auth";
import { redirect } from "react-router-dom";
import { auth } from "../firebase";
import { removeAuthUid } from "../utils/auth";

export const action = async () => {
  try {
    await signOut(auth);
    removeAuthUid();
    return redirect("/");
  } catch (error) {
    console.log(error);
  }
};
