// src/App.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import "./router/AppRouter.css"; // Import layout styles

const App: React.FC = () => {
  return (
    <>
      <Toaster />
      <div className="app-layout">
        <Header />
        <main className="main-content">
          <Outlet /> {/* Child routes will render here */}
        </main>
      </div>
    </>
  );
};

export default App;