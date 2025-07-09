import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

const DashboardHeader = async () => {
  const user = await auth();

  const userImage =
    user?.user.avatarUrl ||
    `https://placehold.co/40x40.png?text=${user?.user.name?.charAt(0)}`;

  return (
    <header className="bg-white border-b border-zinc-200 py-4 shadow-sm">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 hover:bg-zinc-100 px-3 py-2 rounded-xl transition"
        >
          <Image
            src="/img/logo.png"
            alt="AVEI Dashboard Logo"
            width={48}
            height={48}
            priority
            className="rounded-lg shadow-md"
          />
          <span className="text-xl font-bold text-zinc-800 hidden sm:inline">
            AVEI
          </span>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer hover:bg-zinc-100 px-3 py-2 rounded-xl transition">
              <Image
                src={userImage}
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full object-cover border border-zinc-300"
              />
              <div className="hidden md:flex flex-col">
                <span className="font-medium text-sm text-zinc-800">
                  {user?.user.name ?? "Convidado"}
                </span>
                <span className="text-xs text-zinc-500">
                  {user?.user.email ?? ""}
                </span>
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 rounded-xl shadow-xl bg-white border border-zinc-200"
          >
            <DropdownMenuLabel className="text-xs text-zinc-500 px-4 py-2">
              Gerenciar conta
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/perfil"
                className="flex items-center gap-2 text-sm hover:bg-sky-50 text-zinc-700 hover:text-sky-600 rounded-md px-4 py-2 w-full transition"
              >
                <User size={16} className="text-sky-500" />
                Meu perfil
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href="/logout"
                className="flex items-center gap-2 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 rounded-md px-4 py-2 w-full transition"
              >
                <LogOut size={16} />
                Sair
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
