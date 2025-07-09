// DashboardLayout.tsx
import DashboardHeader from "./components/header";
import DashboardSidebar from "./components/sidebar";
import "leaflet/dist/leaflet.css";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-col">
      {/* Header fixo no topo */}
      <header className="flex-none">
        <DashboardHeader />
      </header>

      {/* Conteúdo principal: sidebar + área scrollável */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar fixo na lateral */}
        <aside className="w-64 flex-none">
          <DashboardSidebar />
        </aside>

        {/* Área scrollável só do children */}
        <main className="flex-1 overflow-y-auto p-12">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
