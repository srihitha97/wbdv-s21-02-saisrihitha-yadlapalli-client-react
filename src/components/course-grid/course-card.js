import React,{useState} from 'react'
import {Link} from "react-router-dom";

const CourseCard = ({deleteCourse, course, updateCourse}) => {
    const [editing, setEditing] = useState(false)
    const [newTitle, setNewTitle] = useState(course.title)
    const saveTitle = () => {
        setEditing(false)
        const newCourse = {
            ...course,
            title: newTitle
        }
        updateCourse(newCourse)
    }
    const saveDelete = (course) => {
        setEditing(false)
        deleteCourse(course)
    }

    return (<div className="col-sm-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
        <div className="card" >
            <img src="https://picsum.photos/300/200"
                 alt="start-small"
                 border="0"/>
            <div className="card-body">
                {
                    !editing &&
                    <h5 className="card-title">{course.title}</h5>
                }
                {
                    editing &&
                    <input
                        onChange={(event)=> setNewTitle(event.target.value)}
                        value={newTitle}
                        className="form-control"/>
                }
                <p className="card-text">Some description.</p>
                <Link to={`/courses/grid/editor/${course._id}`}>
                    <i className="btn btn-primary">{course.title}</i>
                </Link>
                <span className="float-right">
          {editing && <i className="fas fa-times text-danger" onClick={() => saveDelete(course)}></i>}
                    {!editing && <i onClick={() => setEditing(true)} className="fas fa-edit"></i>}
                    {editing && <i onClick={() => saveTitle()}  className="fas fa-check text-success"></i>}
          </span>
            </div>
        </div>
    </div>)
}

export default CourseCard