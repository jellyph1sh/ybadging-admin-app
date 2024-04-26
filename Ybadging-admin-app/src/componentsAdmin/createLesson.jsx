import React, { useState, useEffect } from "react";
import axios from "axios";
import { CookiesProvider, useCookies } from "react-cookie";

const CreateLessons = () => {
    const [lessonName, setLessonName] = useState("");
    const [lessonDate, setLessonDate] = useState("");
    const [lessonStart, setLessonStart] = useState("");
    const [lessonEnd, setLessonEnd] = useState("");
    const [room, setRoom] = useState("");
    const [promotion, setPromotion] = useState("");
    const [professor1, setProfessor1] = useState("");
    const [professor2, setprofessor2] = useState("");
    const [errorForm, setErrorForm] = useState(false);

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
        
        if (room=="" || professor1=="" || promotion==""){
            console.log("test true")
            setErrorForm(true);
        } else {
            setErrorForm(false);
        }
      };

    return (
        <body >
        <div>
            <h1>CREATE A LESSON</h1>
        </div>
        <main>
            <form>
                <div>
                <label>
                    Lesson Name
                    <input type="text" name="lessonName" 
                    value={lessonName}
                    onChange={(e) => {
                      setLessonName(e.target.value);
                    }}
                    required/>
                </label>
                </div>
                <div>
                    <div>
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
                    </div>
                    <div>
                        <label>
                            Select a room : 
                            <select name="room" 
                            value={room}
                            onChange={(e) => {
                              setRoom(e.target.value);
                            }}
                            required>
                                <option value="">Choose a room</option>
                                {classroom.map((classroom) => (
                                    <option key={classroom.id} value={classroom.name}>
                                        {classroom.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Select a promotion : 
                            <select name="promotion" 
                            value={promotion}
                            onChange={(e) => {
                              setPromotion(e.target.value);
                            }}
                            required>
                                <option value="">Choose a promotion</option>
                                {promos.map((promos) => (
                                    <option key={promos.id} value={promos.name}>
                                        {promos.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>
                <div>
                <label>
                    Professor : 
                    <select name="professor1" 
                    value={professor1}
                    onChange={(e) => {
                      setProfessor1(e.target.value);
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
                    value={professor2}
                    onChange={(e) => {
                      setprofessor2(e.target.value);
                    }}>
                        <option value="">Choose a professor</option>
                        {professor.map((professor) => (
                            <option key={professor.id} value={professor.id}>
                                {`${professor.firstname} ${professor.lastname}`}
                            </option>
                        ))}
                    </select>
                </label>
                </div>
                {errorForm==true ? 
                            <div>one field is empty</div>
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
