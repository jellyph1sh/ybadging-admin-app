import React from "react";
import {Link} from "react-router-dom";
import Lesson from "../components/lesson.jsx";
import AllLessons from "../components/allLessons.jsx";
import AllPastLessons from "../components/allPastLessons.jsx";
import CreateLessons from "../components/createLesson.jsx";
import CreateStudent from "../components/createStudent.jsx";
import CreateProfessor from "../components/createProfessor.jsx";
import CreateClassroom from "../components/createClassroom.jsx";

const AdminPage = () => {

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/CreateStudent">Create a student</Link>
            </li>
            <li>
              <Link to="/CreateUser">Create a user</Link>
            </li>
            <li>
              <Link to="/NextLesson">Next Lesson</Link>
            </li>
            <li>
              <Link to="/PastLesson">Past Lesson</Link>
            </li>
          </ul>
        </nav>
      </header>
      <body >
        <CreateLessons/>
      </body>
    </>
  );
};

export default AdminPage;
