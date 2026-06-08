"use server";

import connectDB from "@/lib/db";
import User from "@/models/User";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { AuthError } from "next-auth";
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
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }

    const err = error as { code?: string; message?: string };
    const errorMessage = err.message || "";

    // 💡 Yahan hum specific codes ko pakrenge jo humne auth.ts me throw kiye hain
    if (
      err.code === "fields_missing" ||
      errorMessage.includes("fields_missing")
    ) {
      return { error: "Please fill in all the fields" };
    }

    if (
      err.code === "invalid_credentials" ||
      errorMessage.includes("invalid_credentials") ||
      errorMessage.includes("CredentialsSignin") ||
      errorMessage.includes("CallbackRouteError")
    ) {
      return { error: "Invalid email or password" };
    }

    console.error("Actual Backend Auth Error:", error);
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
