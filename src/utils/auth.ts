import { getServerSession } from "next-auth/next";
import googleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import { NextAuthOptions, Session } from "next-auth";
import type { Adapter } from "next-auth/adapters";

export const options: NextAuthOptions = {
  // eslint-disable-next-line new-cap
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
    }),
  }) as Adapter,
  providers: [
    googleProvider({
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          firstName: profile.given_name,
          lastName: profile.family_name,
          image: profile.picture,
          team: "",
          photo: "",
          roles: {},
        };
      },
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    error: "/auth/error",
  },
  callbacks: {
    async session({ session, user }) {
      session.user = user;
      return session;
    },
  },
};

type Restrictions = Record<string, number[]>;

export const authenticate = async (restrictions: Restrictions = {}) => {
  const session: Session | null = await getServerSession(options);

  if (!session?.user) {
    return { message: "Invalid Authentication Credentials.", auth: 401 };
  }

  const authorized = Object.entries(restrictions).some(([key, value]) =>
    value.includes(+session?.user?.roles[key]),
  );

  if (!authorized && Object.keys(restrictions).length > 0) {
    return { message: `Forbidden Access`, auth: 403 };
  }

  return {
    message: null,
    auth: 200,
    uid: session.user.id,
    user: session.user,
  };
};

export const getSession = async () => {
  const session = await getServerSession(options);

  return session;
};
