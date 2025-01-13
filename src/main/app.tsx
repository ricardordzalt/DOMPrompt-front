import { Routes, Route } from "react-router";
import Prompt from "../modules/home/pages/prompt";
import LoginOrRegister from "../modules/auth/pages/login-or-register";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginOrRegister />} />
      <Route path="/login-or-register" element={<LoginOrRegister />} />
      <Route path="/prompt" element={<Prompt />} />
    </Routes>
  );
};

export default App;
