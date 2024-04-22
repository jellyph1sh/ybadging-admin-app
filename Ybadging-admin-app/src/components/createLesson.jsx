import React from "react";

const CreateLessons = () => {

    const listRoom = ['101', '102','201', '202', '203', '204', '301', '302', '303', '304'];
    const listPromo = ['Archi 1', 'Archi 2','Archi 3', 'Info 1', 'Info 2', 'Info 3'];

    const handlesubmit = (data) => {
        data.preventDefault();
        // createLesson();
        console.log(data)
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
                    <input type="text" name="lessonName" required/>
                </label>
                </div>
                <div>
                    <div>
                        <label>
                            Date :
                            <input type="date" name="lessonDate" required/>
                        </label>
                        <label>
                            Start at :
                            <input type="time" name="lessonStart" min="07:00" max="21:00" required />
                        </label>
                        <label>
                            End at :
                            <input type="time" name="lessonEnd" min="07:00" max="21:00" required/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Select a room : 
                            <select name="room" required>
                                {listRoom.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Select a promotion : 
                            <select name="promotion" required>
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
                    {/* <input type="submit" value="Send" /> */}
                    <button onClick={handlesubmit}>submit</button>
                </div>
            </form>
        </main>
        </body>
    );
};

export default CreateLessons;
