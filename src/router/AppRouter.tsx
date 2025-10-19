// src/router/AppRouter.tsx
import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// Lazy load pages
const Home = lazy(() => import("../pages/Home"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const CartPage = lazy(() => import("../pages/CartPage"));
const Checkout = lazy(() => import("../pages/Checkout"));
const OrderSuccess = lazy(() => import("../pages/OrderSuccess"));
const NotFound = lazy(() => import("../pages/NotFound"));
const ProductList = lazy(() => import("../pages/ProductList"));
// --- 1. IMPORT THE LOGIN PAGE ---
const LoginPage = lazy(() => import("../pages/LoginPage"));

// Helper for Suspense
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
);

// 2. Create and export the router
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    errorElement: <SuspenseWrapper><NotFound /></SuspenseWrapper>,
    children: [
      {
        index: true, 
        element: <SuspenseWrapper><Home /></SuspenseWrapper>,
      },
      {
        path: "products/:category",
        element: <SuspenseWrapper><ProductList /></SuspenseWrapper>,
      },
      {
        path: "product/:id",
        element: <SuspenseWrapper><ProductDetail /></SuspenseWrapper>,
      },
      {
        path: "cart",
        element: <SuspenseWrapper><CartPage /></SuspenseWrapper>,
      },
      {
        path: "checkout",
        element: <SuspenseWrapper><Checkout /></SuspenseWrapper>,
      },
      {
        path: "success",
        element: <SuspenseWrapper><OrderSuccess /></SuspenseWrapper>,
      },
      // --- 2. ADD THE LOGIN ROUTE ---
      {
        path: "login",
        element: <SuspenseWrapper><LoginPage /></SuspenseWrapper>,
      },
      // --- END OF NEW ROUTE ---
      {
        path: "*", // Catch-all for 404
        element: <SuspenseWrapper><NotFound /></SuspenseWrapper>,
      },
    ],
  },
]);