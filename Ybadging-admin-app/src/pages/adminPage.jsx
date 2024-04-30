import React from "react";
import {Link} from "react-router-dom";
import Lesson from "../components/lesson.jsx";
import AllLessons from "../components/allLessons.jsx";
import AllPastLessons from "../components/allPastLessons.jsx";
import CreateLessons from "../components/createLesson.jsx";
import CreateStudent from "../components/createStudent.jsx";
import CreateProfessor from "../components/createProfessor.jsx";
import NavbarAdminHome from "../components/navbarAdminHome.jsx"

const AdminPage = () => {

  return (
    <>
      <NavbarAdminHome/>
      <body >
        <CreateLessons/>
      </body>
    </>
  );
};

export default AdminPage;
