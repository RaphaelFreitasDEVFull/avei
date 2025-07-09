import { auth } from "@/auth";
import { Bell, DollarSign, House } from "lucide-react";
import { redirect } from "next/navigation";
import "leaflet/dist/leaflet.css";
import MapWrapper from "./components/mapWrapper";

const Dashboard = async () => {
  const user = await auth();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="p-8 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold">
          Bem vindo, {user?.user.name ?? "Convidado"}
        </h1>
        <h3 className="text-sm text-zinc-600">
          Acompanhe, gerencie e faça previsões das suas propriedades
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
          <div className="flex items-center justify-between w-full ">
            <h2>Valores Recebidos</h2>
            <DollarSign />
          </div>
          <h2 className="text-xl">R$ 0,00</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
          <div className="flex items-center justify-between w-full ">
            <h2>Propriedades Ocupadas</h2>
            <House />
          </div>
          <h2 className="text-xl">56</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
          <div className="flex items-center justify-between w-full ">
            <h2>Reservas Pendentes</h2>
            <Bell />
          </div>
          <h2 className="text-xl">0</h2>
        </div>
      </div>
      <MapWrapper />
    </div>
  );
};

export default Dashboard;
