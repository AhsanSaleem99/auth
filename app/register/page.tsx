import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { register } from "@/actions/user";
import getSession from "@/lib/getsession";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const session = await getSession();
  const user = session?.user;
  if (user) {
    redirect("/");
  } else {
    return (
      <div
        className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900
 text-neutral-100 flex items-center justify-center px-6 py-12"
      >
        <form
          className="bg-neutral-800 p-8 rounded-xl md:rounded-2xl shadow-md w-full max-w-md"
          action={register}
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Welcome</h2>
          <p className="mb-4 text-center">
            Please enter your details to register
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="mb-4">
              <Label htmlFor="firstname" className="block mb-2">
                First Name
              </Label>
              <Input type="text" id="firstname" name="firstname" required />
            </div>
            <div className="mb-4">
              <Label htmlFor="lastname" className="block mb-2">
                Last Name
              </Label>
              <Input type="text" id="lastname" name="lastname" required />
            </div>
          </div>
          <div className="mb-4">
            <Label htmlFor="email" className="block mb-2">
              Email
            </Label>
            <Input type="email" id="email" name="email" required />
          </div>
          <div className="mb-4">
            <Label htmlFor="password" className="block mb-2">
              Password
            </Label>
            <Input type="password" id="password" name="password" required />
          </div>
          <div className="mb-4">
            <Label htmlFor="password" className="block mb-2">
              Confirm Password
            </Label>
            <Input
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
            />
          </div>
          <div className="mb-4">
            <Button
              type="submit"
              className="w-full hover:bg-neutral-700 transition-colors duration-300 ease-in-out cursor-pointer mt-2"
            >
              Register
            </Button>
            <p className="mt-4 text-center">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-neutral-400 hover:underline cursor-pointer hover:text-white"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
};

export default RegisterPage;
