import Image from "next/image";
import Search from "./components/search";
import { Button } from "@/components/ui/button";
import Sidebar from "./components/sidebar";

const Home = () => {
  return (
    <div className="flex flex-col w-full max-w-[1400px] mx-auto px-4">
      <Sidebar />
      <div className="flex flex-col-reverse lg:flex-row w-full mt-12 gap-8">
        {/* Text Section */}
        <div className="w-full lg:w-1/2 mt-8 lg:mt-16 flex flex-col gap-10 lg:gap-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-blue-600">
            Sua casa <br />
            <span className="text-black">em qualquer lugar</span>
          </h1>
          <div className="w-full sm:w-fit flex flex-col gap-4 sm:gap-6">
            <Search />
            <Button className="bg-blue-600 w-full sm:w-auto" size={"lg"}>
              Procurar
            </Button>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-[500px] relative z-0">
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
