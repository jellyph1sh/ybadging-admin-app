import React from "react";

const Lesson = () => {
    const data = [{id:0, firstname: "John", lastname: "Doe", status: 0}, {id:1, firstname: "Jane", lastname: "Doe", status: 1}]
    return (
        <body >
        <div>
            <h1>UX Design</h1>
        </div>
        <div>
            <h3>Room : 201</h3>
            <h3>15h00 - 17h00</h3>
        </div>
        <article>
            <div>
                {data.map(student => 
                    <div key={student.id}>
                        {student.status==true ? 
                            <div className="studentPresent">
                                <p>{`${student.name}, Present`}</p>
                                <button>Absent</button> 
                            </div>
                            : 
                            <div className="studentAbsent">
                                <p>{`${student.name}, Absent`}</p>
                            <   button>Present</button>
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
