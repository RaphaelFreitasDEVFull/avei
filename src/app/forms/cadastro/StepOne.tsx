"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const schema = z
  .object({
    name: z.string().min(1, "O nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirmação obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

interface Props {
  data: {
    name: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    telefone?: string;
    countryId?: string;
    stateId?: string;
    cityId?: string;
  };
  onChange: (field: string, value: string) => void;
}

const StepOneCadastro = ({ data, onChange }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data.name,
      email: data.email,
      password: data.password || "",
      confirmPassword: data.confirmPassword || "",
    },
  });

  // Atualiza os dados externos conforme o usuário digita
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name && value[name as keyof typeof value]) {
        onChange(name, value[name as keyof typeof value] || "");
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  const onSubmit = (formData: FormData) => {
    console.log("Dados válidos:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col space-y-4"
    >
      <h2 className="text-2xl font-bold text-blue-900 text-center">Cadastro</h2>
      <h3 className="text-sm text-gray-500 text-center">
        Crie sua conta para acessar todos os recursos.
      </h3>

      <div className="flex flex-col gap-2 mt-6">
        <Label htmlFor="name" className="text-xs text-gray-600">
          Nome Completo
        </Label>
        <Input id="name" {...register("name")} />
        {errors.name && (
          <span className="text-red-500 text-xs">{errors.name.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-xs text-gray-600">
          E-mail
        </Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password" className="text-xs text-gray-600">
          Senha
        </Label>
        <Input id="password" type="password" {...register("password")} />
        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword" className="text-xs text-gray-600">
          Confirme sua senha
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-xs">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>
    </form>
  );
};

export default StepOneCadastro;
