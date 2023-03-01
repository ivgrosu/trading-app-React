import Login from "../components/Login";
import { redirect } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { setAuthUid } from "../utils/auth";

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;

export const action = async ({ request }) => {
  const data = await request.formData();
  const email = data.get("email");
  const password = data.get("password");

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const uid = user.uid;

    setAuthUid(uid);

    return redirect("/");
  } catch (error) {
    const errorCode = error.code;
    if (errorCode === "auth/user-not-found") {
      return { code: "User not found." };
    }
    if (errorCode === "auth/invalid-email") {
      return { code: "Invalid email." };
    }
    if (errorCode === "auth/wrong-password") {
      return {
        code: "Wrong password.",
      };
    }
    return { code: errorCode };
  }
};
