import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white ">
      <div className="mycontainer flex md:justify-between justify-center items-center h-12 py-5 ">
        <div className="logo font-bold text-2xl ">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </div>
        <button className="text-white bg-green-700 my-5 rounded-full flex  justify-between items-center">
          <img className="invert w-10  p-1 overflow-hidden rounded-full" src="/Github.png"/>
          <span className="font-bold px-2 ">GitHub</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
