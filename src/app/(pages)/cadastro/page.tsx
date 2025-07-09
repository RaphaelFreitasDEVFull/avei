import MultiStepForm from "@/app/forms/cadastro/MultistepCadastro";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

const Cadastro = () => {
  return (
    <div className="flex flex-col lg:flex-row-reverse min-h-screen">
      {/* Lado da imagem */}
      <div className="relative w-full lg:w-1/2 lg:block hidden lg:h-auto">
        <Image
          src="/img/cadastro-img.png"
          alt="hero bg"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Lado do formulário */}
      <div className="w-full lg:w-1/2 flex justify-center  px-6 py-10">
        <div className="max-w-md w-full flex flex-col items-center gap-4">
          <MultiStepForm />
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
