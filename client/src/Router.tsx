import { Navigate, Route, Routes } from "react-router-dom";
import LoginView from "./views/LoginView";
import HomeView from "./views/HomeView";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginView />} />
      <Route path="/home" element={<HomeView />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Router;
