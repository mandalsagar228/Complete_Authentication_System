import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className=" w-full flex items-center justify-between  sm:px-8 px-4 py-4    ">
        <NavLink
          to="/"
          className="hover:cursor-pointer font-inter font-medium bg-black text-white px-4 py-2 rounded-md "
        >
          Home
        </NavLink>
        <div className=" text-[40px] font-medium text-black">
          Complete Authentication System
        </div>

        <NavLink
          to="/LoginPage"
          className="  hover:cursor-pointer font-inter font-medium bg-black text-white px-4 py-2 rounded-md "
        >
          Login
        </NavLink>
      </header>
    </>
  );
};
export default Header;
