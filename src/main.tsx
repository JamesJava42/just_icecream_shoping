// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/AppRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Wrap your app with the provider */}
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);