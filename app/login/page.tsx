import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import getSession from "@/lib/getsession";

const Login = async () => {
  const session = await getSession();
  console.log("Session in login page:", session);
  const user = session?.user;
  if (!user) {
    return <LoginForm />;
  } else {
    redirect("/");
  }
};

export default Login;
