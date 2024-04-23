import React from "react";
import { useNavigate } from "react-router-dom";

const AllLessonsProfessor = () => {
    const lessons = [{id:0, name: "UX Design", dateStart:"2024-04-22 13:00:00.000", dateEnd:"2024-04-23 17:00:00.000",namePromo:"info1",nameClassroom:"201", professor1:"John Doe", professor2:"Jane Doe"}, {id:1, name: "Data", dateStart:"2020-05-23 15:00:00.000", dateEnd:"2020-05-23 17:00:00.000",namePromo:"info2",nameClassroom:"201", professor1:"John Doe", professor2:"Jane Doe"}]
    const navigate = useNavigate();

    const goToLesson = () => {
        navigate("/Lesson");
    };

    return (
        <body >
        <div>
            <h1>UX Design</h1>
        </div>
        <article>
            <div>
                {lessons.map(lesson => 
                <div key={lesson.id}>
                    {new Date(lesson.dateEnd).getTime()>Date.now() ? 
                        <div className="lesson">
                            <p>{`${lesson.name}`}</p>
                            <p>{`${lesson.dateStart} - ${lesson.dateEnd}`}</p>
                            <p>{`${lesson.namePromo} - ${lesson.nameClassroom}`}</p> 
                            <p>{`${lesson.professor1} - ${lesson.professor2}`}</p> 

                            {new Date(lesson.dateStart).getTime()<Date.now() ? 
                                <button onClick={goToLesson}>See the lesson</button>
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

export default AllLessonsProfessor;
