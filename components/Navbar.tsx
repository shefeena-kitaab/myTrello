import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-br-2xl">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50 -z-50"></div>
        <Image
          src="Trello-Logo.svg"
          alt="Trello Logo"
          width={100}
          height={10}
          className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
        />
      </div>
    </header>
  );
};

export default Navbar;
