import React from "react";
import Lesson from "../components/lesson.jsx";
import AllLessons from "../componentsAdmin/allLessons.jsx";
import AllPastLessons from "../componentsAdmin/allPastLessons.jsx";
import CreateLessons from "../componentsAdmin/createLesson.jsx";
import CreateStudent from "../componentsAdmin/createStudent.jsx";
import CreateProfessor from "../componentsAdmin/createProfessor.jsx";
import CreateClassroom from "../componentsAdmin/createClassroom.jsx";

const AdminPage = () => {

  return (
    <body >
      <AllPastLessons/>
    </body>
  );
};

export default AdminPage;
