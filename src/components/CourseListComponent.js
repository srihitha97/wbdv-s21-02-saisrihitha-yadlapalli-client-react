import React from 'react';
import CourseRowComponent from "./CourseRowComponent";
import {Link} from "react-router-dom";


class CourseListComponent extends React.Component {


    render() {
        return (
            <div>

            <table className="table" style={{marginTop: "60px"}}>

            <thead>
            <tr>
                <th>Title</th>
                <th className="d-none d-sm-table-cell">Owned by</th>
                <th className="d-none d-lg-table-cell">Last Modified</th>
                <th>
                    <a className="ml-2" href="#"><i className="fa fa-folder"/></a>
                    <a className="ml-2" href="#"><i className="fa fa-sort-alpha-asc"/></a>
                    <Link to="/grid"><i className="ml-2 fa fa-th"/></Link>
                </th>
            </tr>
            </thead>

            <tbody>
            {
                this.props.courses.map(course =>
                    <CourseRowComponent
                        deleteCourse={this.props.deleteCourse}
                        updateRowCourses={this.props.updateRowCourses}
                        key={course._id}
                        course={course}/>
                )
            }
            </tbody>
            </table>

            </div>
        );
    }
}


export default CourseListComponent;
