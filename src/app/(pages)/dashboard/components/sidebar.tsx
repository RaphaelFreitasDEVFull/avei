"use client";

import { Bell, Cog, Home, Inbox, LogOut, Sofa } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
  { label: "Dashboard", icon: <Home size={20} />, href: "/dashboard" },
  {
    label: "Gestão de Propriedades",
    icon: <Sofa size={20} />,
    href: "/dashboard/propriedades",
  },
  {
    label: "Avaliação dos Imóveis",
    icon: <Bell size={20} />,
    href: "/dashboard/avaliacoes",
  },
  {
    label: "Requisições de reservas",
    icon: <Inbox size={20} />,
    href: "/dashboard/reservas",
  },
];

const bottomItems = [
  {
    label: "Configurações",
    icon: <Cog size={20} />,
    href: "/dashboard/configuracoes",
  },
  { label: "Sair", icon: <LogOut size={20} />, href: "/logout" },
];

const DashboardSidebar = () => {
  const pathname = usePathname();

  const renderLink = (item: (typeof navItems)[0]) => (
    <Link
      key={item.href}
      href={item.href}
      className={clsx(
        "group flex items-center gap-3 text-sm font-medium my-1 p-3 rounded-xl transition-all",
        pathname === item.href
          ? "bg-indigo-500 text-white shadow-md"
          : "text-zinc-700 hover:bg-zinc-100 hover:text-indigo-600"
      )}
    >
      <span className="transition-transform duration-200 group-hover:scale-110">
        {item.icon}
      </span>
      {item.label}
    </Link>
  );

  return (
    <aside className="bg-white w-[280px] min-h-full p-6 flex flex-col justify-between border-r border-zinc-200 shadow-sm">
      <div className="space-y-1">{navItems.map(renderLink)}</div>
      <div className="space-y-1 pt-4 border-t border-zinc-200">
        {bottomItems.map(renderLink)}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
