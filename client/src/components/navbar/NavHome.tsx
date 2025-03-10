import { strings } from "../../constants/strings";

const NavHome = () => {
  return (
    <a href="/home" className="text-primary text-2xl">
      {strings.login.title}
    </a>
  );
};

export default NavHome;
