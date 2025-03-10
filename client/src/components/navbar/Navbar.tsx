import NavHome from "./NavHome";
import NavExit from "./NavExit";

const Navbar = () => {
  return (
    <nav className=" sticky z-50 top-0 w-full min-h-24 flex items-center justify-between">
      <NavHome /> <NavExit />
    </nav>
  );
};

export default Navbar;
