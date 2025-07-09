import { NextResponse } from "next/server";
import { hashSync } from "bcrypt-ts";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, password, telefone, countryId, stateId, cityId } =
      data;

    // Validação básica
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nome, email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    // Verifica email existente
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email já cadastrado" },
        { status: 409 }
      );
    }

    // Cria usuário
    const hashedPassword = hashSync(password);
    const user = await db.user.create({
      data: {
        name,
        email,
        phoneNumber: telefone,
        passwordHash: hashedPassword,
        countryId,
        stateId,
        cityId,
      },
    });

    return NextResponse.json(
      { success: true, userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro no servidor:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
