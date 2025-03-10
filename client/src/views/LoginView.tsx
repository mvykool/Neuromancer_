import CommandsRain from "../components/login/CommandsRain";
import FloatingWindow from "../components/login/FloatingWindow";

const LoginView = () => {
  return (
    <div className="p-1 bg-black h-screen">
      <CommandsRain />
      <FloatingWindow />
    </div>
  );
};

export default LoginView;
