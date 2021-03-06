import React ,{useState} from 'react';
import {Link} from "react-router-dom";
const CourseCard = (
    {
        course,
        lastModified="1/1/2021",
        owner="who knows?",
        deleteCourse,
        updateCourse
    }) => {
    const [editing, setEditing] = useState(false)
    const [title, setTitle] = useState(course.title)
    const saveCourse = () => {
        setEditing(false)
        const newCourse = {
            ...course,
            title: title
        }
        updateCourse(newCourse)
    }
    return (
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-1">
            <div className="card" style={{width: "100%", margin: "15px"}}>
                {<img className="card-img-top" src="https://picsum.photos/300/200" />}
                <div className="card-body" style={{width: "13rem", hieght: "18em", margin: "15px"}} >
                    <h5 className="card-title">
                        {!editing &&
                        <a href="/editor">
                            {course.title}
                        </a>
                        }
                        {editing &&
                        <input
                            className="form-control"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}/>
                        }
                    </h5>
                    <p className="card-text">Some Description</p>
                    <p>{course.owner}</p>
                    <p>{course.lastModified}</p>
                    <div>
                        {editing &&
                        <i onClick={() => deleteCourse(course)} className="fas fa-trash"></i>
                        }
                        {
                            editing &&
                            <i onClick={() => saveCourse()} className="fas fa-check"></i>
                        }
                        {
                            !editing &&
                            <i onClick={() => setEditing(true)} className="fas fa-edit"></i>
                        }
                    </div>
                </div>
            </div>
        </div>
    )}
export default CourseCard
