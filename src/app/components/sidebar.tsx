import Image from "next/image";

const Sidebar = () => {
  return (
    <header>
      <nav>
        <Image src={"/img/logo.png"} />
      </nav>
    </header>
  );
};

export default Sidebar;
