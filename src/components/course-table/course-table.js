import React from 'react';
import CourseRow from "./course-row";
import {Link} from "react-router-dom";
import '../course-manager.css';



class CourseTable extends React.Component {


    render() {
        return (
            <div>

            <table className="table wbdv-margin">
                <thead className= "wbdv-sticky wbdv-table-headers" >
                <tr >
                    <th className="position-sticky wbdv-table-headers">Title </th>
                    <th className="d-none d-sm-table-cell position-sticky wbdv-table-headers">Owned by</th>
                    <th className="d-none d-lg-table-cell position-sticky wbdv-table-headers">Last Modified</th>
                    <th className="position-sticky wbdv-table-headers">
                        <a className="ml-2" href="#"><i className="fa fa-folder"/></a>
                        <a className="ml-2" href="#"><i className="fa fa-sort-alpha-asc"/></a>
                        <Link to="/grid"><i className="ml-2 fa fa-th"/></Link>
                    </th>
                </tr>
                </thead>

                <tbody>
                {
                    this.props.courses.map(course =>
                        <CourseRow
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


export default CourseTable;
