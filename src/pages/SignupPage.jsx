import Signup from "../components/Signup";
import { redirect } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const SignupPage = () => {
  return <Signup />;
};

export default SignupPage;

export const action = async ({ request }) => {
  const data = await request.formData();
  const email = data.get("email");
  const password = data.get("password");

  try {
    await createUserWithEmailAndPassword(auth, email, password);

    return redirect("/");
  } catch (error) {
    const errorCode = error.code;
    if (errorCode === "auth/email-already-in-use") {
      return { code: "Email already in use" };
    }
    if (errorCode === "auth/invalid-email") {
      return { code: "Invalid email" };
    }
    if (errorCode === "auth/weak-password") {
      return {
        code: "Week password. Password should be at least 6 characters.",
      };
    }
  }
};
