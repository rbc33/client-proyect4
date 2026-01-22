import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/theme.context.tsx";
import { AuthProviderWrapper } from "./context/auth.context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProviderWrapper>
          <App />
        </AuthProviderWrapper>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
