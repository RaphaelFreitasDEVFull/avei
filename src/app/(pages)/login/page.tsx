import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const LoginPage = () => {
  return (
    <div className="flex">
      <div className="w-1/2 min-w-1/2 relative h-screen z-0">
        <Image
          src="/img/login-img.png"
          alt="hero bg"
          fill
          className="object-cover"
        />
      </div>
      <div className="w-1/2 flex items-center justify-center flex-col gap-2">
        <Image src={"/img/logo.png"} alt="logo" width={200} height={200} />
        <h2 className="text-2xl font-bold text-blue-900">Login</h2>
        <h3 className="text-sm text-gray-500">
          Bem-vindo de volta! Por favor, insira seus dados.
        </h3>
        <div className="w-full p-8 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Senha</Label>
            <Input />
          </div>
        </div>
        <div className="flex items-center justify-between w-full px-8">
          <div className="flex gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Lembre-se</Label>
          </div>
          <Link href={"/"} className="font-semibold text-blue-600">
            Esqueceu sua senha?
          </Link>
        </div>
        <div className="w-full px-8 mt-4">
          <Button size={"lg"} className="w-full cursor-pointer">
            Entrar
          </Button>
        </div>
        <div className="flex gap-3 mt-4">
          <div className="p-4 border border-gray-500 rounded-2xl">
            <FaFacebook className="w-6 h-6" />
          </div>
          <div className="p-4 border border-gray-500 rounded-2xl">
            <FaGoogle className="w-6 h-6" />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-400">
            Não tem uma conta?{" "}
            <Link href={"#"} className="text-indigo-700">
              Crie sua conta agora.
            </Link>
          </p>
        </div>
        <p className="text-xs text-gray-400">&copy; AVEI</p>
      </div>
    </div>
  );
};

export default LoginPage;
