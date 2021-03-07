import React from 'react'
import CourseCard from "./course-card";
import {Link, Route} from "react-router-dom";

const CourseGrid = ({courses, deleteCourse,updateCourse}) =>{
    return (<div>
            <table className="table">
                <thead>
                <tr>
                    <th className="d-none d-md-table-cell">Recent documents</th>
                    <th className="d-none d-md-table-cell">Owned by me</th>
                    <th className="position-sticky">
                        <a className="ml-2" href="#"><i className="fa fa-folder"/></a>
                        <a className="ml-2" href="#"><i className="fa fa-sort-alpha-down"/></a>
                        <Link to="/courses/table"><i className="pl-2 fa fa-list"/></Link>
                    </th>

                </tr>
                </thead>
            </table>

            <div className="row">
                {
                    courses.map((course,ndx) =>
                        <CourseCard
                            deleteCourse={deleteCourse}
                            course={course}
                            key={course._id}
                            updateCourse={updateCourse}
                        />
                    )
                }
            </div>
        </div>
    )}


export default CourseGrid