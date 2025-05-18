import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Languages } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Sidebar = () => {
  return (
    <div className="flex items-center justify-between">
      <Image src={"/img/logo.png"} alt="logo" width={150} height={150} />
      <nav
        className="flex items-center gap-4 text-gray-600 text-base
       "
      >
        <Link
          className="py-2 hover:border-b-4 hover:border-yellow-300"
          href={"#"}
        >
          Inicio
        </Link>
        <Link
          className="py-2 hover:border-b-4 hover:border-yellow-300"
          href={"#"}
        >
          Propietarios
        </Link>
        <Link
          className="py-2 hover:border-b-4 hover:border-yellow-300"
          href={"#"}
        >
          AVEI
        </Link>
        <Link
          className="py-2 hover:border-b-4 hover:border-yellow-300"
          href={"#"}
        >
          Sobre nós
        </Link>
      </nav>
      <div className="flex gap-4">
        <Button variant={"ghost"} className="cursor-pointer">
          Login
        </Button>

        <Button variant={"secondary"} className="cursor-pointer">
          <Languages />
        </Button>
        <Button className="cursor-pointer">Encontre um lugar</Button>
      </div>
    </div>
  );
};

export default Sidebar;
