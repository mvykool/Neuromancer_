import { strings } from "../../constants/strings";

const NavExit = () => {
  return (
    <a
      href="/login"
      className="text-primary text-lg border-4 border-primary px-8 py-2"
    >
      {strings.nav.exit}
    </a>
  );
};

export default NavExit;
