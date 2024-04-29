import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";

const Lesson = () => {
    const [cookies] = useCookies(["idLesson"]);
    const [lesson, setLesson] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        getLesson(cookies.idLesson);
        getStudents(cookies.idLesson);
      }, []);

    const getLesson = async (id) => {
        await axios
          .get(
            "http://localhost:3001/api/lessons/getOneLesson",{params:{id : id}})
          .then((response) => {
            if (!response.data.status) {
              console.log(response.data.error);
              return;
            }
            setLesson(response.data.lessons)
          })
          .catch(function (error) {
            console.log(error);
            return;
          });
      };

    const getStudents = async (id) => {
        await axios
        .get(
            "http://localhost:3001/api/students/lesson",{params:{id : id}})
        .then((response) => {
            if (!response.data.status) {
                console.log(response.data.error);
                return;
            }
            console.log("test")
            setStudents(response.data.students)
        })
        .catch(function (error) {
            console.log(error);
            return;
        });
    };

    const changeStatus = async (status, idStudent) => {
        try {
            await changeStatusRequest(status, idStudent, cookies.idLesson);
            const updatedStudents = students.map(student => {
                if (student.id === idStudent) {
                    return { ...student, status: !status };
                }
                return student;
            });
            setStudents(updatedStudents);
        } catch (error) {
            console.log(error);
        }
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

    const changeStatusRequest = async (status,idStudent,idLesson) => {
        await axios
        .put(
            "http://localhost:3001/api/students/status",{idLesson: idLesson, idStudent: idStudent,status: !status})
        .then((response) => {
            if (!response.data.status) {
                console.log(response.data.error);
                return;
            }
        })
        .catch(function (error) {
            console.log(error);
            return;
        });
    };

    return (
    <body >
        <Link to="/Admin">Home</Link>
        {lesson.map(data => 
        <div className="HeaderLessonCard" key={data.id}>
            <div>
                <h1>{`${data.name}`}</h1>
            </div>
            <h3>{`Promotion : ${data.namePromo}`} </h3>
            <h3>{`Room : ${data.nameClassroom}`} </h3>
            <h3>{`${formatDateFrDay(data.dateStart)} ${formatDateFrHours(data.dateStart)} - ${formatDateFrHours(data.dateEnd)}`}</h3>
            </div>
        )}
        <article>
            <div>
                 {students.map(student => 
                    <div key={student.id}>
                        {student.status==true ? 
                            <div className="studentPresent">
                                <p>{`${student.firstname} ${student.lastname}, Present`}</p>
                                <button className="absenceButton" onClick={() => changeStatus(student.status, student.id)}>Absent</button> 
                            </div>
                            : 
                            <div className="studentAbsent">
                                <p>{`${student.firstname} ${student.lastname}, Absent`}</p>
                            <   button className="presenceButton" onClick={() => changeStatus(student.status, student.id)}>Present</button>
                            </div>
                        }
                    </div>
                )} 
            </div>
        </article>
    </body>
    );
};

export default Lesson;
