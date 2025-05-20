"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Languages, Menu, X } from "lucide-react";

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full px-4 py-2 shadow-sm">
      <div className="flex items-center justify-between max-w-[1400px] mx-auto">
        {/* Logo */}
        <Image src="/img/logo.png" alt="logo" width={120} height={120} />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-gray-600 text-base">
          <Link
            className="py-2 hover:border-b-4 hover:border-yellow-300"
            href="#"
          >
            Início
          </Link>
          <Link
            className="py-2 hover:border-b-4 hover:border-yellow-300"
            href="#"
          >
            Proprietários
          </Link>
          <Link
            className="py-2 hover:border-b-4 hover:border-yellow-300"
            href="#"
          >
            AVEI
          </Link>
          <Link
            className="py-2 hover:border-b-4 hover:border-yellow-300"
            href="#"
          >
            Sobre nós
          </Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4">
          <Button variant="ghost" className="cursor-pointer">
            Login
          </Button>
          <Button variant="secondary" className="cursor-pointer">
            <Languages />
          </Button>
          <Button className="cursor-pointer">Encontre um lugar</Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="flex flex-col items-start px-4 mt-4 gap-4 md:hidden text-gray-700">
          <Link href="#" className="hover:text-blue-600">
            Início
          </Link>
          <Link href="#" className="hover:text-blue-600">
            Proprietários
          </Link>
          <Link href="#" className="hover:text-blue-600">
            AVEI
          </Link>
          <Link href="#" className="hover:text-blue-600">
            Sobre nós
          </Link>
          <div className="flex flex-col gap-2 mt-2 w-full">
            <Button variant="ghost" className="w-full text-left">
              Login
            </Button>
            <Button variant="secondary" className="w-full text-left">
              <Languages className="inline-block mr-2" />
              Idioma
            </Button>
            <Button className="w-full text-left">Encontre um lugar</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Sidebar;
