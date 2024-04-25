import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AllPastLessons = () => {
    const [lessons, setLessons] = useState([]);
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(["idLesson"]);

    const goToLesson = (id) => {
      setCookie("idLesson", id, { path: "/" })
      navigate("/Lesson");
    };

    useEffect(() => {
        getLesson();
      }, []);

    const getLesson = async () => {
        await axios
          .get(
            "http://localhost:3001/api/lessons/getLessons",{})
          .then((response) => {
            if (!response.data.status) {
              console.log(response.data.error);
              return;
            }
            setLessons(response.data.lessons)
            console.log(lessons)
          })
          .catch(function (error) {
            console.log(error);
            return;
          });
      };

    return (
        <body >
        <div>
            <h1>PAST LESSON</h1>
        </div>
        <article>
            <div>
                {lessons.map(lesson => 
                <div key={lesson.id}>
                    {new Date(lesson.dateEnd).getTime()<Date.now() ? 
                        <div className="lesson">
                            <p>{`${lesson.name}`}</p>
                            <p>{`${lesson.dateStart} - ${lesson.dateEnd}`}</p>
                            <p>{`${lesson.namePromo} - ${lesson.nameClassroom}`}</p> 
                            <p>{`${lesson.professor1} `}</p> 
                            {lesson.professor2 != null ? 
                                <p>{`- ${lesson.professor2}`}</p>
                                : 
                                <></>
                            }
                            <button onClick={() => goToLesson(lesson.id)}>See the lesson</button>
                        </div>
                        : 
                        <></>
                    } 
                </div>
                )}
            </div>
        </article>
        </body>
    );
};

export default AllPastLessons;
