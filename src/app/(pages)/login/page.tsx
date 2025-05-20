import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const LoginPage = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Lado da imagem */}
      <div className="relative w-full lg:w-1/2 lg:block hidden lg:h-auto">
        <Image
          src="/img/login-img.png"
          alt="hero bg"
          fill
          className="object-cover"
        />
      </div>

      {/* Lado do formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">
        <div className="max-w-md w-full flex flex-col items-center gap-4">
          <Image src="/img/logo.png" alt="logo" width={150} height={150} />
          <h2 className="text-2xl font-bold text-blue-900">Login</h2>
          <h3 className="text-sm text-gray-500 text-center">
            Bem-vindo de volta! Por favor, insira seus dados.
          </h3>

          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label>Email</Label>
              <Input type="email" placeholder="Digite seu email" />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Senha</Label>
              <Input type="password" placeholder="Digite sua senha" />
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Lembre-se</Label>
              </div>
              <Link href="/" className="text-blue-600 font-medium">
                Esqueceu sua senha?
              </Link>
            </div>

            <Button size="lg" className="w-full">
              Entrar
            </Button>
          </div>

          {/* Redes sociais */}
          <div className="flex gap-4 mt-4">
            <button className="p-3 border border-gray-400 rounded-xl">
              <FaFacebook className="w-5 h-5" />
            </button>
            <button className="p-3 border border-gray-400 rounded-xl">
              <FaGoogle className="w-5 h-5" />
            </button>
          </div>

          {/* Cadastro */}
          <p className="text-sm text-gray-500 text-center">
            Não tem uma conta?{" "}
            <Link href="#" className="text-indigo-700 font-semibold">
              Crie sua conta agora.
            </Link>
          </p>

          <p className="text-xs text-gray-400 text-center mt-4">&copy; AVEI</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
