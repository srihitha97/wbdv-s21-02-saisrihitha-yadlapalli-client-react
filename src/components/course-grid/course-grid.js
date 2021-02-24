import React from "react";
import {Link} from "react-router-dom";
import CourseCard from "./course-card"
import '../course-manager.css';


export default class CourseGrid extends React.Component {


    render() {
        return (
            <div>

                <table className="table wbdv-margin">
                    <thead>
                    <tr>
                        <th className="d-none d-md-table-cell">Recent documents</th>
                        <th className="d-none d-md-table-cell">Owned by me</th>
                        <th className="position-sticky">
                            <a className="ml-2" href="#"><i className="fa fa-folder"/></a>
                            <a className="ml-2" href="#"><i className="fa fa-sort-alpha-asc"/></a>
                            <Link to="/"><i className="pl-2 fa fa-list"/></Link>
                        </th>

                    </tr>
                    </thead>
                </table>

                <div className="card-deck mt-5">
                    {
                        this.props.courses.map((course) =>
                            <CourseCard
                                course={course}
                                deleteCourse={this.props.deleteCourse}
                                updateRowCourses={this.props.updateRowCourses}
                                key={course._id}/>
                        )
                    }
                </div>

            </div>
        )
    }

}