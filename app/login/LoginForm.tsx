"use client";
import { login } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState, useTransition } from "react";

const GithubButton = () => {
  return (
    <button
      type="button"
      onClick={() => signIn("github", { callbackUrl: "/" })}
      className="w-full hover:bg-neutral-700 transition-colors duration-300 ease-in-out cursor-pointer mt-2"
    >
      <IconBrandGithub size={24} className="inline mr-2 " />
      Continue with GitHub
    </button>
  );
};

const GoogleButton = () => {
  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="w-full hover:bg-neutral-700 transition-colors duration-300 ease-in-out cursor-pointer mt-2"
    >
      <IconBrandGoogle size={24} className="inline mr-2 " />
      Continue with Google
    </button>
  );
};

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleFormSubmit = async (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900
 text-neutral-100 flex items-center justify-center px-6 py-12"
    >
      <form
        className="bg-neutral-800 p-8 rounded-xl md:rounded-2xl shadow-md w-full max-w-md flex flex-col gap-4"
        action={handleFormSubmit}
      >
        <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
        <p className="text-center">Please enter your details to login</p>
        <div>
          <Label htmlFor="email" className="mb-2">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            required
            className="bg-neutral-700 text-white "
          />
        </div>
        <div className="mb-2">
          <Label htmlFor="password" className="mb-2">
            Password
          </Label>
          <Input
            type="password"
            id="password"
            name="password"
            required
            className="bg-neutral-700 text-white"
          />
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="w-full hover:bg-neutral-700 transition-colors duration-300 ease-in-out cursor-pointer mt-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Logging in..." : "Login"}
        </Button>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <p className="text-center">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-neutral-400 hover:underline cursor-pointer hover:text-white"
          >
            Register
          </Link>
        </p>
        <div className="bg-gradient-to-r from-transparent via-neutral-600 to-transparent my-4 h-[1px] w-full" />{" "}
        <section className="flex flex-col space-y-4">
          <GithubButton />
          <GoogleButton />
        </section>
      </form>
    </div>
  );
};

export default LoginForm;
