import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import NavbarAdmin from "./navbarAdmin.jsx";

const AllLessons = () => {
    const [lessons, setLessons] = useState([]);
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(["idLesson"]);

    const goToLesson = (id) => {
      setCookie("idLesson", id, { path: "/" })
      navigate("/Lesson");
    };

    const deleteLesson = (id) => {
            //
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
           <NavbarAdmin/>
        <div>
            <h1>LESSON</h1>
        </div>
        <article>
            <div>
                {lessons.map(lesson => 
                <div key={lesson.id}>
                    {new Date(lesson.dateEnd)>new Date(Date.now()) ? 
                        <div className="lessonCardList">
                            <h2>{`${lesson.name}`}</h2>
                            <h3>{`${formatDateFrDay(lesson.dateStart)} ${formatDateFrHours(lesson.dateStart)} - ${formatDateFrHours(lesson.dateEnd)}`}</h3>
                            <h3>{`${lesson.namePromo}`}</h3>
                            <h3>{`Classroom : ${lesson.nameClassroom}`}</h3>  
                            <h3>{`Professor : ${lesson.professor1} `}</h3> 
                            {lesson.professor2 != null ? 
                                <h3>{`Professor : ${lesson.professor2}`}</h3>
                                : 
                                <></>
                            }
                            {new Date(lesson.dateStart)<new Date(Date.now()) ? 
                                <button className="goToLessonButton" onClick={() => goToLesson(lesson.id)}>See the lesson</button>
                                : 
                                <></>
                            } 
                            <button className="deleteLessonButton" onClick={() => deleteLesson(lesson.id)}>Delete the lesson</button>
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
