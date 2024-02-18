import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import User from "@/database/models/user.model";
import { connectToDatabase } from "@/database/models/connect";

connectToDatabase();

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {
          email: "",
          password: "",
        };

        const user = await User.findOne({ email });

        if (!user) {
          return null;
        }

        const passwordsMatch = await bcryptjs.compare(password, user.password);

        if (!passwordsMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token }) {
      const user = await User.findById(token.sub);

      token.name = user?.name;
      token.email = user?.email;
      token.picture = user?.picture;
      token.isAdmin = user?.isAdmin;
      token.isOnVacation = user?.isOnVacation;

      return token;
    },
    async session({ session, token }) {
      // @ts-ignore
      session.user.id = token.sub;
      // @ts-ignore
      session.user.isAdmin = token.isAdmin;
      // @ts-ignore
      session.user.isOnVacation = token.isOnVacation;
      session.user?.name === token.name;
      session.user?.email === token.email;
      session.user?.image === token.picture;

      return session;
    },
  },
};
