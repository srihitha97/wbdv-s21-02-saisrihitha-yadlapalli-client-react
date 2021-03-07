import React, {useState} from "react"
import {Link} from "react-router-dom";
//import {updateCourse} from "../services/course-service";

const CourseRow = (
    {
        lastModified,
        updateCourse,
        course,
        title,
        owner,
        deleteCourse
    }) =>{
    const [editing, setEditing] = useState(false)
    const [newTitle, setNewTitle] = useState(title)
    const saveTitle = () => {
        setEditing(false)
        var today = (new Date()).toDateString()
        const date = (new Date()).toDateString()
        const newCourse = {
            ...course,
            title: newTitle,
            lastModified: date
        }
        updateCourse(newCourse)
    }
    const saveDelete = (course) => {
        setEditing(false)
        deleteCourse(course)
    }
    return (
        <tr>
            <td >
                {!editing &&
                <Link to={`/courses/table/editor/${course._id}`}>
                    <i className="fas fa-file-alt"></i>
                    &nbsp;
                    {title}
                </Link>
                }
                {editing && <input
                    onChange={(event) => setNewTitle(event.target.value)}
                    value={newTitle}
                    className="form-control"/>}
            </td>
            <td className="d-none d-md-table-cell">{owner}</td>
            <td className="d-none d-lg-table-cell">{lastModified}</td>
            <td >
          <span className="float-right px-5">
          {editing && <i className="fas fa-times text-danger" onClick={() => saveDelete(course)}></i>}
              {!editing && <i onClick={() => setEditing(true)} className="fas fa-edit"></i>}
              {editing && <i onClick={() => saveTitle()} className="fas fa-check text-success"></i>}
          </span>
            </td>
        </tr>
    )
}

export default CourseRow