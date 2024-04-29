import React, { useState, useEffect } from "react";
import axios from "axios";
import { CookiesProvider, useCookies } from "react-cookie";

const CreateLessons = () => {
    const [lessonName, setLessonName] = useState("");
    const [lessonDate, setLessonDate] = useState("");
    const [lessonStart, setLessonStart] = useState("");
    const [lessonEnd, setLessonEnd] = useState("");
    const [idClassroom, setIdClassroom] = useState("");
    const [idPromo, setIdPromo] = useState("");
    const [idProfessor1, setIdProfessor1] = useState("");
    const [idProfessor2, setIdProfessor2] = useState("");

    const [errorForm, setErrorForm] = useState(false);
    const [validForm, setValidForm] = useState(false);
    const [errorDateForm, setErrorDateForm] = useState(false);

    const [promos, setPromos] = useState([]);
    const [classroom, setClassroom] = useState([]);
    const [professor, setProfessor] = useState([]);

    useEffect(() => {
        getClassroom();
        getProfessor();
        getPromo();
      }, []);

    const getPromo = async () => {
        await axios
          .get(
            "http://localhost:3001/api/promos/",{})
          .then((response) => {
            if (!response.data.status) {
              console.log(response.data.error);
              return;
            }
            setPromos(response.data.promos)
          })
          .catch(function (error) {
            console.log(error);
            return;
          });
      };

      const getClassroom = async () => {
        await axios
          .get(
            "http://localhost:3001/api/classroom/",{})
          .then((response) => {
            if (!response.data.status) {
              console.log(response.data.error);
              return;
            }
            setClassroom(response.data.classrooms)
          })
          .catch(function (error) {
            console.log(error);
            return;
          });
      };

      const getProfessor = async () => {
        await axios
          .get(
            "http://localhost:3001/api/user/professor",{})
          .then((response) => {
            if (!response.data.status) {
              console.log(response.data.error);
              return;
            }
            setProfessor(response.data.professors)
          })
          .catch(function (error) {
            console.log(error);
            return;
          });
      };

    const handlesubmit = (e) => {
        e.preventDefault();
        
        if (idClassroom=="" || idProfessor1=="" || idPromo==""){
            setErrorForm(true);
            setValidForm(false);
            setErrorDateForm(false);
        }
        else if (new Date(dateFormat(lessonStart,lessonDate))<new Date(Date.now()) == true || new Date(dateFormat(lessonEnd,lessonDate))<new Date(Date.now()) == true || new Date(dateFormat(lessonEnd,lessonDate))<new Date(dateFormat(lessonStart,lessonDate)) == true){
          setErrorForm(false);
          setValidForm(false);
          setErrorDateForm(true);
        } else {
            createLesson(lessonName,dateFormat(lessonStart,lessonDate),dateFormat(lessonEnd,lessonDate),idClassroom,idPromo)
            setLessonName("");
            setLessonDate("");
            setLessonStart("");
            setLessonEnd("");
            setIdPromo("");
            setIdClassroom("");
            setIdProfessor1("");
            setIdProfessor2("");
            e.lessonName = "";
            e.lessonDate = "";
            e.lessonStart = "";
            e.lessonEnd = "";
            e.idClassroom = "";
            e.idPromo = "";
            e.idProfessor1 = "";
            e.idProfessor2 = "";
        }
      };

    function dateFormat(heure, jour) {
        var [annee, mois, jour] = jour.split('-').map(Number);
        var [heures, minutes] = heure.split(':').map(Number);
        var date = new Date(annee, mois - 1, jour, heures, minutes);
        
        if (isNaN(date.getTime())) {
            return null;
        }
        
        // Formater la date combinée au format mm/dd/yyyy hh:mm:ss
        var formattedDate = `${(mois < 10 ? '0' : '') + mois}/${(jour < 10 ? '0' : '') + jour}/${annee} ${(heures < 10 ? '0' : '') + heures}:${(minutes < 10 ? '0' : '') + minutes}:00`;
        return formattedDate;
    }

    const createLesson = async (firstname,lastname,email,RFID,idPromo) => {
        await axios
        .post(
            "http://localhost:3001/api/lessons/add",{name: firstname, date_start: lastname, date_end: email, id_classroom:RFID, id_promo:idPromo})
        .then((response) => {
            if (!response.data.status) {
                console.log(response.data.error);
                return;
            }
            createLessonProf(idProfessor1,response.data.lessonId)
            if (idProfessor2 != ""){
              createLessonProf(idProfessor2,response.data.lessonId)
            }
        })
        .catch(function (error) {
            console.log(error);
            return;
        });
    };

    const createLessonProf = async (idProf,lessonId) => {
      await axios
      .post(
          "http://localhost:3001/api/userLesson/add",{userId: idProf, lessonId: lessonId})
      .then((response) => {
          if (!response.data.status) {
              console.log(response.data.error);
              setErrorForm(true);
              setValidForm(false);
              setErrorDateForm(false);
              return;
          }
          setErrorForm(false);
          setErrorDateForm(false);
          setValidForm(true);
      })
      .catch(function (error) {
          setErrorForm(true);
          setValidForm(false);
          setErrorDateForm(false);
          console.log(error);
          return;
      });
  };

    return (
        <body >
        <div className="title">
            <h1>CREATE A LESSON</h1>
        </div>
        <main>
            <form>
                <label>
                    Lesson Name : 
                    <input type="text" name="lessonName" 
                    value={lessonName}
                    onChange={(e) => {
                      setLessonName(e.target.value);
                    }}
                    required/>
                </label>
        
                <label>
                    Date : 
                    <input type="date" name="lessonDate" 
                    value={lessonDate}
                    onChange={(e) => {
                      setLessonDate(e.target.value);
                    }}
                    required/>
                </label>
                <label>
                    Start at : 
                    <input type="time" name="lessonStart" min="07:00" max="21:00" 
                    value={lessonStart}
                    onChange={(e) => {
                      setLessonStart(e.target.value);
                    }}
                    required />
                </label>
                <label>
                    End at : 
                    <input type="time" name="lessonEnd" min="07:00" max="21:00" 
                    value={lessonEnd}
                    onChange={(e) => {
                      setLessonEnd(e.target.value);
                    }}
                    required/>
                </label>
      
                <label>
                    Select a room : 
                    <select name="room" 
                    value={idClassroom}
                    onChange={(e) => {
                      setIdClassroom(e.target.value);
                    }}
                    required>
                        <option value="">Choose a room</option>
                        {classroom.map((classroom) => (
                            <option key={classroom.id} value={classroom.id}>
                                {classroom.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Select a promotion : 
                    <select name="promotion" 
                    value={idPromo}
                    onChange={(e) => {
                      setIdPromo(e.target.value);
                    }}
                    required>
                        <option value="">Choose a promotion</option>
                        {promos.map((promos) => (
                            <option key={promos.id} value={promos.id}>
                                {promos.name} {promos.grade}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Professor : 
                    <select name="professor1" 
                    value={idProfessor1}
                    onChange={(e) => {
                      setIdProfessor1(e.target.value);
                    }}
                    required>
                        <option value="">Choose a professor</option>
                        {professor.map((professor) => (
                            <option key={professor.id} value={professor.id}>
                                {`${professor.firstname} ${professor.lastname}`}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Professor (optional) : 
                    <select name="professor2"
                    value={idProfessor2}
                    onChange={(e) => {
                      setIdProfessor2(e.target.value);
                    }}>
                        <option value="">Choose a professor</option>
                        {professor.map((professor) => (
                            <option key={professor.id} value={professor.id}>
                                {`${professor.firstname} ${professor.lastname}`}
                            </option>
                        ))}
                    </select>
                </label>
            
                {errorForm==true ? 
                    <div  className="errorMessage">One field is empty</div>
                    : 
                    <></>
                }
                {errorDateForm==true ? 
                    <div className="errorMessage">A Date is wrong</div>
                    : 
                    <></>
                }
                {validForm==true ? 
                    <div  className="validMessage">Lesson created</div>
                    : 
                    <></>
                }
                <div>
                    <button onClick={handlesubmit}>Create</button>
                </div>
            </form>
        </main>
        </body>
    );
};

export default CreateLessons;
