import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import PropertyTable from "../../components/tables/PropertyTable";
import db from "@/lib/db";
import { auth } from "@/auth";
import Link from "next/link";

const Propiedades = async () => {
  const user = await auth();

  const properties = await db.property.findMany({
    where: {
      hostId: user?.user.id,
    },

    include: {
      host: true,
    },
  });

  return (
    <div className="p-8 flex flex-col space-y-12">
      <div className="bg-zinc-200 shadow-lg rounded-lg p-6 flex items-center justify-between">
        <Link href="/dashboard/propriedades/novo">
          <Button variant={"destructive"} className="cursor-pointer">
            Adicionar Propriedade
          </Button>
        </Link>
        <div className="relative flex items-center">
          <Input
            placeholder="Nome da Propriedade"
            className="w-80 p-4 bg-white"
          />
          <Search
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
            size={16}
          />
        </div>
      </div>
      <div>
        <PropertyTable properties={properties} />
      </div>
    </div>
  );
};

export default Propiedades;
