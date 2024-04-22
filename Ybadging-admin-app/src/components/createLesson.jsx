import React, { useState } from "react";

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

    const listRoom = ['101', '102','201', '202', '203', '204', '301', '302', '303', '304'];
    const listPromo = ['Archi 1', 'Archi 2','Archi 3', 'Info 1', 'Info 2', 'Info 3'];
    const listProf = ['Kay', 'Orochimaru','luffy', 'Natsu', 'Jiraya', 'Leo'];

    const handlesubmit = (e) => {
        e.preventDefault();
        
        if (room=="" || professor1=="" || promotion==""){
            console.log("test true")
            setErrorForm(true);
        } else {
            console.log("test false")
            // createLesson();
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
                                {listRoom.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
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
                                {listPromo.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
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
                        {listProf.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
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
                        {listProf.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
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
