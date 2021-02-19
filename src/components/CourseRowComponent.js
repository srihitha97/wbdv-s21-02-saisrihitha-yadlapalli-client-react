import React from "react";
import {Link} from "react-router-dom";
import {updateCourse} from "../services/CourseService";


export default class CourseRowComponent extends React.Component {

    state = {
        editing: false,
        course: this.props.course
    }


    render() {
        return (
        <tr>
            <td>
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
                    !this.state.editing &&
                    <Link to={`/edit/${this.props.course._id}`}>
                        {this.props.course.title}
                    </Link>
                }
            </td>
            <td className="d-none d-sm-table-cell">{this.props.course.owner}</td>
            <td className="d-none d-lg-table-cell">{this.props.course.modified}</td>
            <td>
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
                        className="btn btn-link"><i className="fa fa-check"/></button>
                }
                {
                    this.state.editing &&
                    <button
                        onClick={() =>
                            this.props.deleteCourse(this.props.course)
                        }
                        className="btn btn-link"><i className="fa fa-trash"/></button>
                }

            </td>
        </tr>
        )
    }


}
