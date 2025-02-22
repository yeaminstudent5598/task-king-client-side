import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Routes";
import "./style.css";
import { AuthContextProvider } from "./context/AuthContext";
import { SnackbarProvider } from "notistack";
import Overlay from "./components/ui/Overlay";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const querClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={querClient}>
      <AuthContextProvider>
        <SnackbarProvider>
          <RouterProvider router={router} />
          <Overlay />
        </SnackbarProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
