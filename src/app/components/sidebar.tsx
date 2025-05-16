import Image from "next/image";

const Sidebar = () => {
  return (
    <header>
      <nav>
        <Image src={"/img/logo.png"} alt="image" width={500} height={500} />
      </nav>
    </header>
  );
};

export default Sidebar;
