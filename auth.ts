import { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "./lib/db";
import User from "./models/User";
import { compare } from "bcrypt-ts";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    role?: string | null;
  }

  interface Session {
    user: {
      id: string;
      role?: string | null;
    } & import("next-auth").DefaultSession["user"];
  }
  interface JWT {
    role?: string | null;
  }
}

class FieldsMissingError extends CredentialsSignin {
  code = "fields_missing";
}
class InvalidCredentialsError extends CredentialsSignin {
  code = "invalid_credentials";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) {
          throw new FieldsMissingError();
        }

        await connectDB();

        const user = await User.findOne({ email }).select("+password +role");

        if (!user || !user.password) {
          throw new InvalidCredentialsError();
        }

        const isPasswordCorrect = await compare(password, user.password);

        if (!isPasswordCorrect) {
          throw new InvalidCredentialsError();
        }

        const userData = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          id: user._id.toString(),
        };

        return userData;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as string; // ✅ Ab yahan koi red line nahi aayegi
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // ✅ Ab yahan bhi red line nahi aayegi
      }
      return token;
    },

    signIn: async ({ user, account }) => {
      if (account?.provider === "github" || account?.provider === "google") {
        try {
          const { email, name, image, id } = user;
          await connectDB();
          const alreadyUser = await User.findOne({ email });

          if (!alreadyUser) {
            await User.create({
              email,
              name,
              image,
              authProviderId: id,
            });
          } else {
            // User already exists, proceed to sign in
            return true;
          }
        } catch (error) {
          throw new Error("Error while creating User", { cause: error });
        }
      }

      if (account?.provider === "credentials") {
        return true;
      }
      return false;
    },
  },
});
