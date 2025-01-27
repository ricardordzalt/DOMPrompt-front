import { createRoot } from "react-dom/client";
import App from "./app";
import "./styles";
import { Providers } from "./providers";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <App />
  </Providers>
);
