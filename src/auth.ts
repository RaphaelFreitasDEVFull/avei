import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authUser } from "@/app/actions/login";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import db from "@/lib/db";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string;
      emailVerified: Date | null;
      phoneNumber?: string | null;
      avatarUrl?: string | null;
      bio?: string | null;
      role?: string;
      lastLoginAt?: Date | null;
      isHost?: boolean;
      createdAt?: Date | null;
      updatedAt?: Date | null;
      deletedAt?: Date | null;
    };
  }
  interface User {
    phoneNumber?: string | null;
    avatarUrl?: string | null;
    bio?: string | null;
    role?: string;
    emailVerified?: boolean | Date | null;
    lastLoginAt?: Date | null;
    isHost?: boolean;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
  }
}

// Extend NextAuth types to include custom fields

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email ou senha não fornecidos");
        }

        const user = await authUser(
          credentials.email as string,
          credentials.password as string
        );
        console.log("User:", user);

        if (!user) {
          throw new Error("Credenciais inválidas");
        }

        console.log("Usuário autenticado:", user);

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber ?? null,
          avatarUrl: user.avatarUrl ?? null,
          bio: user.bio ?? null,
          role: user.role ?? "guest",
          emailVerified: user.emailVerified ?? false,
          lastLoginAt: user.lastLoginAt ?? null,
          isHost: user.isHost ?? false,
          createdAt: user.createdAt ?? null,
          updatedAt: user.updatedAt ?? null,
          deletedAt: user.deletedAt ?? null,
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID! as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET! as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID! as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET! as string,
      authorization: {
        params: {
          scope: "email,public_profile",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    // O token JWT é gerado aqui (quando o usuário faz login)
    async jwt({ token, user, trigger }) {
      if (trigger === "signIn" && user) {
        // Defina token.remember conforme necessário, por exemplo, sempre false ou baseado em outra lógica
        token.remember = false;
        token.exp =
          Math.floor(Date.now() / 1000) +
          (token.remember ? 60 * 60 * 24 * 30 : 60 * 60 * 30); // 30 dias ou 1 hora
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.phoneNumber = user.phoneNumber ?? null;
        token.avatarUrl = user.avatarUrl ?? null;
        token.bio = user.bio ?? null;
        token.role = user.role ?? "guest";
        token.emailVerified = user.emailVerified ?? false;
        token.lastLoginAt = user.lastLoginAt ?? null;
        token.isHost = user.isHost ?? false;
        token.createdAt = user.createdAt ?? null;
        token.updatedAt = user.updatedAt ?? null;
        token.deletedAt = user.deletedAt ?? null;
      }
      return token;
    },

    // A sessão que chega no cliente é customizada aqui
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        name: token.name ?? null,
        email: (token.email ?? "") as string,
        phoneNumber:
          typeof token.phoneNumber === "string" ? token.phoneNumber : null,
        avatarUrl: typeof token.avatarUrl === "string" ? token.avatarUrl : null,
        bio: typeof token.bio === "string" ? token.bio : null,
        role: typeof token.role === "string" ? token.role : "guest",
        lastLoginAt:
          token.lastLoginAt instanceof Date
            ? token.lastLoginAt
            : typeof token.lastLoginAt === "string"
            ? new Date(token.lastLoginAt)
            : null,
        emailVerified:
          token.emailVerified instanceof Date
            ? token.emailVerified
            : typeof token.emailVerified === "string"
            ? new Date(token.emailVerified)
            : null,
        isHost: typeof token.isHost === "boolean" ? token.isHost : false,
        createdAt:
          token.createdAt instanceof Date
            ? token.createdAt
            : typeof token.createdAt === "string"
            ? new Date(token.createdAt)
            : null,
        updatedAt:
          token.updatedAt instanceof Date
            ? token.updatedAt
            : typeof token.updatedAt === "string"
            ? new Date(token.updatedAt)
            : null,
        deletedAt:
          token.deletedAt instanceof Date
            ? token.deletedAt
            : typeof token.deletedAt === "string"
            ? new Date(token.deletedAt)
            : null,
      };
      return session;
    },
  },
  session: {
    strategy: "jwt", // usar JWT para sessão
  },
  events: {
    async signIn({ user }) {
      const existingUser = await db.user.findUnique({
        where: { email: user.email as string },
      });

      if (!existingUser) {
        await db.user.create({
          data: {
            email: user.email!,
            name: user.name ?? "",
            avatarUrl: user.image ?? "",
            role: "guest", // Defina o papel padrão como 'guest'
            isHost: false, // Defina isHost como false por padrão
            passwordHash: "", // Senha não é necessária para login social
          },
        });
      }
    },
  },
  debug: process.env.NODE_ENV === "development",
});
