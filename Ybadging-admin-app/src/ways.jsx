import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connection from "./pages/connectionPage.jsx";
import AdminPage from "./pages/adminPage.jsx";
import ProfessorPage from "./pages/professorPage.jsx";

const Ways = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Connection />} />
        <Route path="*" element={<Connection />} />
        <Route path="/Admin" element={<AdminPage />} />
        <Route path="/Professor" element={<ProfessorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Ways;
