"use server";

import connectDB from "@/lib/db";
import User from "@/models/User";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { AuthError, CredentialsSignin } from "next-auth";
import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";

const login = async (formData: FormData): Promise<{ error: string } | void> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Please fill in all the fields");
  }
  try {
    const result = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
    if (result?.error) {
      return { error: "Invalid email or password" };
    }
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: "Invalid email or password" };
      }
    }

    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }

    return { error: "Something went wrong" };
  }

  redirect("/");
};

const register = async (formData: FormData) => {
  const firstName = formData.get("firstname") as string;
  const lastName = formData.get("lastname") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!firstName || !lastName || !email || !password) {
    throw new Error("Please fill in all the fields");
  }

  await connectDB();

  //Existing User
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await hash(password, 10);

  await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  revalidatePath("/private/settings");
  console.log("User created successfully:");
  redirect("/login");
};

const logout = async () => {
  await signOut();
  redirect("/");
};

export { register, login, logout };
