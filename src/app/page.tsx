import Image from "next/image";
import Search from "./components/search";

const Home = () => {
  return (
    <div className="flex w-full mt-12">
      <div className="w-1/2 mt-16 flex flex-col gap-16">
        <h1 className="text-6xl font-semibold text-blue-600">
          Procure sua estadia <br />
          <span className="text-black">para o futuro</span>
        </h1>
        <div className="w-fit">
          <Search />
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
  );
};

export default Home;
