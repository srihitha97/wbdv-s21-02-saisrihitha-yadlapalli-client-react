import React from "react";
import CourseCardComponent from "./CourseCardComponent";
import {Link} from "react-router-dom";


export default class CourseGridComponent extends React.Component {


    render() {
        return (
            <div>

            <table className="table" style={{marginTop: "60px"}}>
            <thead>
            <tr>
                <th className="d-none d-sm-table-cell">Recent documents</th>
                <th className="d-none d-sm-table-cell">Owned by me</th>
                <th>
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
                        <CourseCardComponent
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