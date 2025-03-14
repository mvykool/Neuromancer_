import NavHome from "./NavHome";
import NavExit from "./NavExit";
import NavDashboard from "./NavDashboard";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-11/12 min-h-24 flex items-center justify-between">
      <NavHome />
      <NavDashboard />
      <NavExit />
    </nav>
  );
};

export default Navbar;
