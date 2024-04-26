import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AllLessons = () => {
    const [lessons, setLessons] = useState([]);
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies([""]);

    const goToLesson = (id) => {
      setCookie("idLesson", id, { path: "/" })
      navigate("/LessonProf");
    };

    useEffect(() => {
        getLesson(cookies.idUser);
    }, []);

    const getLesson = async (idUser) => {
        await axios
          .get(
            "http://localhost:3001/api/lessons/getLessonOnProf",{params:{id : idUser}})
          .then((response) => {
            if (!response.data.status) {
              console.log(response.data.error);
              return;
            }
            setLessons(trierParDate(response.data.lessons,('dateStart')))
          })
          .catch(function (error) {
            console.log(error);
            return;
          });
      };

      function formatDateFrHours(date) {
        const dateObj = new Date(date);
        const hour = dateObj.getHours();
        let minute = dateObj.getMinutes();
        if (minute<10){
            minute = minute.toString()
            minute = "0" + minute
        }
        return `${hour}H${minute}`;
      }

      function formatDateFrDay(date) {
        const moisFr = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
        const dateObj = new Date(date);
        const jour = dateObj.getDate();
        const mois = moisFr[dateObj.getMonth()];
        const annee = dateObj.getFullYear();
        return `${jour} ${mois} ${annee}`;
      }

      function trierParDate(liste, dateKey) {
        liste.sort((a, b) => {

          const dateA = new Date(a[dateKey]);
          const dateB = new Date(b[dateKey]);
          return dateA - dateB;
        });
      
        return liste;
      }

    return (
        <body >
        <div>
            <h1>LESSON</h1>
        </div>
        <article>
            <div>
                {lessons.map(lesson => 
                <div key={lesson.id}>
                    {new Date(lesson.dateEnd)>new Date(Date.now()) ? 
                        <div className="lesson">
                            <p>{`${lesson.name}`}</p>
                            <p>{`${formatDateFrDay(lesson.dateStart)} ${formatDateFrHours(lesson.dateStart)} - ${formatDateFrHours(lesson.dateEnd)}`}</p>
                            <p>{`${lesson.namePromo} - ${lesson.nameClassroom}`}</p> 
                            <p>{`${lesson.professor1} `}</p> 
                            {lesson.professor2 != null ? 
                                <p>{`- ${lesson.professor2}`}</p>
                                : 
                                <></>
                            }
                            {new Date(lesson.dateStart)<new Date(Date.now()) ? 
                                <button onClick={() => goToLesson(lesson.id)}>See the lesson</button>
                                : 
                                <></>
                            } 
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

export default AllLessons;
