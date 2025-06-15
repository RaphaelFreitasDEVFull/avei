import LoginForm from "@/app/forms/LoginForm";
import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const LoginPage = async () => {
  const user = await auth();
  console.log("User:", user);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Lado da imagem */}
      <div className="relative w-full lg:w-1/2 lg:block hidden lg:h-auto">
        <Image
          src="/img/login-img.png"
          alt="hero bg"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Lado do formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">
        <div className="max-w-md w-full flex flex-col items-center gap-4">
          <Image
            src="/img/logo.png"
            alt="logo"
            width={150}
            height={150}
            style={{ height: "auto" }} // Mantém a proporção ajustando a altura automaticamente
            priority
          />

          <h2 className="text-2xl font-bold text-blue-900">Login</h2>
          <h3 className="text-sm text-gray-500 text-center">
            Bem-vindo de volta! Por favor, insira seus dados.
          </h3>

          <LoginForm />

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
