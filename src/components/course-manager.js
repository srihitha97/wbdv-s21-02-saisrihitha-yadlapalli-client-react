import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import CourseTable from "./course-table/course-table";
import CourseEditor from "./course-editor/course-editor";
import CourseGrid from "./course-grid/course-grid";
import CourseNavbar from "./course-navbar";
import {createCourse, findAllCourses, deleteCourse} from "../services/course-service";


export default class CourseManager extends React.Component {

    state = {
        courses: []
    }

    componentDidMount() {
        findAllCourses()
            .then(courses => {
                this.setState({courses: courses})
            })
    }


    updateRowCourses = () => {
        findAllCourses()
            .then(courses => {
                this.setState({
                    courses: courses
                })
            })
    }


    deleteCourse = (course) => {
        deleteCourse(course._id)
            .then(status => this.setState(prevState => ({
                    courses: prevState.courses.filter(c => c._id !== course._id)
                })
            ))
    }


    addCourse = (newTitle) => {
        const newCourse = {
            title: newTitle,
            owner: "me",
            modified: (new Date()).toDateString()
        }
        document.getElementById('title-fld').value = "";
        createCourse(newCourse)
            .then(actualCourse => this.setState(prevState => ({
                courses: [
                    ...prevState.courses, actualCourse
                ]
            })
            ))
    }


    render() {
        return (
            <div>
                <BrowserRouter>

                    <div className = "container">
                        <Route path="/" exact>
                            <CourseTable
                                courses={this.state.courses}
                                addCourse={this.addCourse}
                                deleteCourse={this.deleteCourse}
                                updateRowCourses={this.updateRowCourses}/>
                        </Route>
                        <Route path="/edit/:courseId" exact component={CourseEditor}/>

                        <Route path="/grid" exact>
                            <CourseGrid
                                courses={this.state.courses}
                                addCourse={this.addCourse}
                                deleteCourse={this.deleteCourse}
                                updateRowCourses={this.updateRowCourses}/>
                        </Route>
                    </div>

                    <Route path={["/", "/grid"]} exact>
                        <CourseNavbar addCourse={this.addCourse}/>
                    </Route>

                </BrowserRouter>
            </div>
        )

    }
}