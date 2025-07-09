import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";

const NovaPropriedade = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-indigo-700">
        Adicionar Propriedade
      </h1>
      <div className="flex items-center justify-between gap-8">
        <div className="flex flex-col space-y-4 mt-6">
          <h2 className="text-xl font-bold text-gray-700">
            Fotos da Propiedade
          </h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center space-y-4 w-[350px]">
            <Upload className="text-gray-500" size={25} />
            <p className="text-gray-500">Arraste e solte as fotos aqui</p>
            <p className="text-gray-500">ou</p>
            <Button className="bg-indigo-600 text-white px-4 py-2 rounded   hover:bg-indigo-700">
              Selecionar Fotos
            </Button>
          </div>
        </div>
        <div className="flex flex-col flex-1 space-y-4 mt-6">
          <h2 className="text-xl font-bold text-gray-700">Informações</h2>
          <Input placeholder="Nome da Propriedade" />
          <Textarea
            placeholder="Descrição"
            rows={4}
            maxLength={500}
            className="resize-none"
          />
          <Input placeholder="Preço" type="number" min={0} />
        </div>
      </div>
    </div>
  );
};

export default NovaPropriedade;
