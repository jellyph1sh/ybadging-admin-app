import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connection from "./pages/connectionPage.jsx";
import AdminPage from "./pages/adminPage.jsx";
import ProfessorPage from "./pages/professorPage.jsx";
import Lesson from "./components/lesson.jsx";
import CreateStudent from "./components/createStudent.jsx"
import CreateUser from "./components/createProfessor.jsx"
import NextLesson from "./components/allLessons.jsx"
import PastLesson from "./components/allPastLessons.jsx"
import LessonProf from "./components/lessonProf.jsx";

const Ways = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Connection />} />
        <Route path="*" element={<Connection />} />
        <Route path="/Admin" element={<AdminPage />} />
        <Route path="/Professor" element={<ProfessorPage />} />
        <Route path="/Lesson" element={<Lesson />} />
        <Route path="/CreateStudent" element={<CreateStudent />} />
        <Route path="/CreateUser" element={<CreateUser />} />
        <Route path="/NextLesson" element={<NextLesson />} />
        <Route path="/PastLesson" element={<PastLesson />} />
        <Route path="/LessonProf" element={<LessonProf />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Ways;
