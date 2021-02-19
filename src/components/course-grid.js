import React from "react";
import {Link} from "react-router-dom";
import {updateCourse} from "../services/course-service";


export default class CourseGrid extends React.Component {


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

export class CourseCard extends React.Component {

    state = {
        course: this.props.course,
        editing: false
    }


    render() {
        return (
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-1">

                <div className="card">
                    <img className="card-img-top"
                         src="https://picsum.photos/300/200"/>

                    <div className="card-body">
                        <h5 className="card-title">
                            {this.state.course.title}
                        </h5>
                        <p className="card-text">
                            Modified: {this.state.course.modified}
                        </p>
                        <Link className="btn btn-primary"
                              to={`/edit/${this.props.course._id}`}>More..</Link>

                        {
                            !this.state.editing &&
                            <div>
                                <button
                                    onClick={() => this.setState({editing: true})}
                                    className="btn btn-link">
                                    <i className="fa fa-pencil"/></button>
                            </div>
                        }
                        {
                            this.state.editing &&
                            <button
                                onClick={() =>
                                    updateCourse(this.state.course._id, this.state.course)
                                        .then(status => {
                                            this.props.updateRowCourses()
                                            this.setState({editing: false})
                                        })
                                }
                                className="btn btn-link">
                                <i className="fa fa-check"/>
                            </button>
                        }
                        {
                            this.state.editing &&
                            <button
                                onClick={() => this.props.deleteCourse(this.props.course)}
                                className="btn btn-link">
                                <i className="fa fa-trash"/>
                            </button>
                        }

                        {
                            this.state.editing &&
                            <input className="form-control"
                                   onChange={(e) => {
                                       const newTitle = e.target.value
                                       this.setState(prevState => ({
                                           course: {...prevState.course, title: newTitle}
                                       }))
                                   }
                                   }
                                   value={this.state.course.title}/>
                        }
                        {
                        }

                    </div>
                </div>

            </div>
        )

    }


}