"use server";

import { signIn } from "@/auth";
import db from "@/lib/db";
import { compareSync } from "bcrypt-ts";

// Função para login com feedback amigável
export const loginUser = async (_: unknown, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  // const remember = formData.get("remember") === "on";

  if (!email || !password) {
    return {
      success: false,
      message: "Por favor, preencha todos os campos.",
    };
  }
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return {
        success: false,
        message:
          result.error === "CredentialsSignin"
            ? "E-mail ou senha incorretos. Tente novamente."
            : "Não foi possível entrar. Verifique suas credenciais.",
      };
    }

    return { success: true, message: "Login realizado com sucesso!" };
  } catch (error: unknown) {
    console.error("Erro no login:", error);
    return {
      success: false,
      message:
        error instanceof Error && error.message === "Failed to fetch"
          ? "Não foi possível conectar ao servidor. Verifique sua internet."
          : "Ocorreu um erro inesperado. Tente novamente mais tarde.",
    };
  }
};

export const authUser = async (
  emailUser: string,
  password: string
): Promise<{
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  avatarUrl: string | null;
  bio: string | null;
  role: string;
  emailVerified: Date | null;
  lastLoginAt: Date | null;
  isHost: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
} | null> => {
  const user = await db.user.findUnique({
    where: { email: emailUser },
  });

  if (!user) return null;

  const checkPassword = compareSync(password, user.passwordHash);

  if (!checkPassword) return null;

  // Retorne apenas os dados necessários
  const {
    id,
    name,
    email,
    phoneNumber,
    avatarUrl,
    bio,
    role,
    emailVerified,
    lastLoginAt,
    isHost,
    createdAt,
    updatedAt,
    deletedAt,
  } = user;

  return {
    id,
    name,
    email,
    phoneNumber,
    avatarUrl,
    bio,
    role,
    emailVerified: typeof emailVerified === "boolean" ? null : emailVerified,
    lastLoginAt,
    isHost,
    createdAt,
    updatedAt,
    deletedAt,
  };
};
