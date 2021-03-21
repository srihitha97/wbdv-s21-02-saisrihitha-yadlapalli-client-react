import React from 'react'
import CourseTable from "./course-table/course-table";
import CourseGrid from "./course-grid/course-grid";
import CourseEditor from "./course-editor/course-editor";
import {Link, Route} from "react-router-dom";
import courseService, {findAllCourses, deleteCourse,updateCourse} from "../services/course-service";

class CourseManager extends React.Component {
    newDate = () => {
        var today = new Date()
        const date = (new Date()).toDateString()
        return date
    }
    state = {
        courses : [
        ],
        newCourse: {
            title: "",
            owner: "me",
            lastModified:this.newDate()
        }
    }

    updateCourse = (course) => {
        console.log(course)
        courseService.updateCourse(course._id, course).then(
            status => this.setState(
                (prevStatus) => ({
                    ...prevStatus,
                    courses: prevStatus.courses.map(c =>
                        c._id === course._id ? course : c
                    )
                })
            )
        )
    }

    componentDidMount() {
        courseService.findAllCourses().then(actualCourses => this.setState({courses: actualCourses}))
    }

    onCourseChange = (e) => {
        const courseToAdd = this.state.newCourse
        var today = new Date()
        const date = (new Date()).toDateString()
        this.setState({
            newCourse: {
                title: e.target.value,
                owner: "me",
                lastModified:date
            }
        })
    }


    addCourse = (event) => {
        let courseToAdd = this.state.newCourse
        var today = new Date()
        const date = (new Date()).toDateString()
        if (this.state.newCourse.title.trim() === "") {
            courseToAdd = {
                title: "New Course",
                owner: "me",
                lastModified: date
            }
        }
        courseService.createCourse(courseToAdd)
            .then(course => this.setState(
                (prevState) => ({
                    ...prevState,
                    courses: [
                        ...prevState.courses,
                        course
                    ]
                })))
        this.setState({newCourse: {title: "", owner: "me",
                lastModified:date}})
        event.preventDefault()
    }

    deleteCourse = (courseToDelete) => {
        courseService.deleteCourse(courseToDelete._id)
            .then(status => {
                this.setState((prevState) => ({
                    ...prevState,
                    courses: prevState.courses.filter
                    (course => course !== courseToDelete)
                }))
            })
    }

    render() {
        return (
            <div>
                <Route path={"/courses/table"} exact>
                    <nav className="justify-content-start navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
                        <em className="fa fa-bars fa-3x wbdv-field wbdv-hamburger d-block text-light"></em>
                        <a className="navbar-brand col-2 d-none d-lg-block d-xl-block" href="#">Course Manager</a>
                        <form className="form-inline">
                            <label htmlFor="title-fld" className="wbdv-label wbdv-course-manager"/>
                            <div className="input-group justify-content-start pl-3 col-xs-15 col-md-15 col-sm-15 col-15">
                                <input type="text"
                                       id="wbdv-new-course-title"
                                       className="form-control float right"
                                       onChange={this.onCourseChange}
                                       value={this.state.newCourse.title}
                                       placeholder="New Course Title"/>
                                <div className="input-group-append">
                                    <button className="btn btn-success"
                                            onClick={this.addCourse}
                                            type="button">
                                        +
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="row">

                            <button className="btn btn-success"
                                    style={{position: "fixed", bottom: 0, right: 0}}
                                    onClick={this.addCourse}><i className="fa fa-plus-circle"/></button>
                        </div>
                    </nav>
                </Route>
                <Route path="/courses/grid" exact>
                    <nav className="justify-content-start navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
                        <em className="fa fa-bars fa-3x wbdv-field wbdv-hamburger d-block text-light"></em>
                        <a className="navbar-brand col-2 d-none d-lg-block d-xl-block" href="#">Course Manager</a>
                        <form className="form-inline">
                            <label htmlFor="title-fld" className="wbdv-label wbdv-course-manager"/>
                            <div className="input-group justify-content-start pl-3 col-xs-15 col-md-15 col-sm-15 col-15">
                                <input type="text"
                                       id="wbdv-new-course-title"
                                       className="form-control float right"
                                       onChange={this.onCourseChange}
                                       value={this.state.newCourse.title}
                                       placeholder="New Course Title"/>
                                <div className="input-group-append">
                                    <button className="btn btn-success"
                                            onClick={this.addCourse}
                                            type="button">
                                        +
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="row">

                            <button className="btn btn-success"
                                    style={{position: "fixed", bottom: 0, right: 0}}
                                    onClick={this.addCourse}><i className="fa fa-plus-circle"/></button>
                        </div>
                    </nav>
                </Route>

                <Route path="/courses/table" exact>
                    <div className="wbdv-react-table">
                        <CourseTable
                            updateCourse={this.updateCourse}
                            deleteCourse={this.deleteCourse}
                            courses = {this.state.courses}/>
                    </div>
                </Route>


                <Route path="/courses/grid" exact>
                    <div className="wbdv-react-grid">
                        <br/>
                        <br/>
                        <br/>
                        <CourseGrid
                            updateCourse={this.updateCourse}
                            deleteCourse={this.deleteCourse}
                            courses = {this.state.courses}/>
                    </div>
                </Route>

                <Route path={["/courses/:layout/editor/:courseId/modules/:moduleId/lessons/:lessonId/topics/:topicId/widgets","/courses/:layout/editor/:courseId/:moduleId/:lessonId/:topicId","/courses/:layout/editor/:courseId/:moduleId/:lessonId","/courses/:layout/editor/:courseId/:moduleId","/courses/:layout/editor/:courseId"]}
                       render={(props) => <CourseEditor {...props}/>}>
                </Route>
                <Route path="/courses/table" exact><a href="#">
                    <i onClick={this.addCourse}
                       className="btn btn-success"
                       style={{position: "fixed", bottom: 0, right: 0}}></i>
                </a></Route>
                <Route path="/courses/grid" exact><a href="#">
                    <i onClick={this.addCourse}
                       className="btn btn-success"
                       style={{position: "fixed", bottom: 0, right: 0}}></i>
                </a></Route>
            </div>
        )
    }
}

export default CourseManager