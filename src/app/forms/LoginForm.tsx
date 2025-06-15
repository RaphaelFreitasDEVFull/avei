"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useActionState } from "react";
import Loader from "../components/Loader";
import { loginUser } from "../actions/login";

const LoginForm = () => {
  const [state, formAction, isLoading] = useActionState(loginUser, null);

  return (
    <form action={formAction} className="w-full flex flex-col gap-4">
      {state?.message && (
        <p className="text-red-500 text-sm text-center">{state.message}</p>
      )}
      <div className="flex flex-col gap-1">
        <Label>Email</Label>
        <Input type="email" name="email" placeholder="Digite seu email" />
      </div>
      <div className="flex flex-col gap-1">
        <Label>Senha</Label>
        <Input type="password" name="password" placeholder="Digite sua senha" />
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Checkbox id="remember" name="remember" />
          <Label htmlFor="remember">Lembre-se</Label>
        </div>
        <Link href="/" className="text-blue-600 font-medium">
          Esqueceu sua senha?
        </Link>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
        {isLoading ? <Loader label="Entrando" /> : "Entrar"}
      </Button>
    </form>
  );
};

export default LoginForm;
