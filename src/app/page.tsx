import Image from "next/image";
import Search from "./components/search";
import { Button } from "@/components/ui/button";
import Sidebar from "./components/sidebar";

const Home = () => {
  return (
    <div className="flex flex-col w-full max-w-[1400px] mx-auto ">
      <Sidebar />
      <div className="flex w-full mt-12">
        <div className="w-1/2 mt-16 flex flex-col gap-16">
          <h1 className="text-6xl font-semibold text-blue-600">
            Sua casa <br />
            <span className="text-black">em qualquer lugar</span>
          </h1>
          <div className="w-fit flex flex-col gap-6">
            <Search />
            <Button className="bg-blue-600" size={"lg"}>
              Procurar
            </Button>
          </div>
        </div>

        <div className="w-1/2 min-w-1/2 relative h-[500px] z-0">
          <Image
            src="/img/hero.png"
            alt="hero bg"
            fill
            className="object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
