import React from 'react'
import CourseRow from "./course-row";
import {Link, Route} from "react-router-dom";
import '../components.css';
import '../course-manager.css';

export default class CourseTable extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <table className='table'>
                        <thead className= "wbdv-sticky wbdv-table-headers">
                        <tr>
                            <th className="position-sticky wbdv-table-headers">Title</th>
                            <th className="position-sticky wbdv-table-headers d-none d-md-table-cell">Owned by</th>
                            <th className="d-none d-lg-table-cell position-sticky wbdv-table-headers">Last Modified</th>
                            <th className="d-none d-lg-table-cell position-sticky wbdv-table-headers">Quizzes</th>
                            <th className="position-sticky wbdv-table-headers">
              <span className="float-right px-5">
                <a className="ml-2" href="#"><i className="fa fa-folder"/></a>
                <a className="ml-2" href="#"><i className="fas fa-sort-alpha-down"/></a>
                <Link to="/courses/grid">
                  <i className="ml-2 fa fa-th"/>
                </Link>
             </span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.courses.map((course,ndx) =>
                                <CourseRow
                                    updateCourse={this.props.updateCourse}
                                    deleteCourse={this.props.deleteCourse}
                                    key={course._id}
                                    course={course}
                                    title={course.title}
                                    lastModified={course.lastModified}
                                    owner={course.owner}
                                />)
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}