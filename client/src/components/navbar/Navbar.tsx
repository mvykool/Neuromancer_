import NavHome from "./NavHome";
import NavExit from "./NavExit";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-11/12 min-h-24 flex items-center justify-between">
      <NavHome /> <NavExit />
    </nav>
  );
};

export default Navbar;
