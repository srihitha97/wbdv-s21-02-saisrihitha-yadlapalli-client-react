import React, {useEffect, useState} from 'react'
import {BrowserRouter, useParams, Link, Route} from "react-router-dom";
import ModuleList from "./module-list";
import {combineReducers, createStore} from "redux";
import moduleReducer from "../../reducers/module-reducer";
import topicReducer from "../../reducers/topic-reducer";
import lessonReducer from "../../reducers/lesson-reducer";
import {Provider} from "react-redux";
import LessonTabs from "./lesson-tabs";
import TopicPills from "./topic-pills";
import courseService from "../../services/course-service"
import widgetReducer from "../../reducers/widget-reducer";
import WidgetList from "../widgets/widget-list";


const reducer = combineReducers({
    moduleReducer: moduleReducer,
    lessonReducer: lessonReducer,
    topicReducer: topicReducer,
    widgetReducer: widgetReducer
})

const store = createStore(reducer)
const CourseEditor = ({history}) => {
    //console.log(history.location.pathname)
    const {layout,courseId, moduleId} = useParams();
    const [courseName, setCourseName] = useState({title: ""})
    useEffect( () => {
        courseService.findCourseById(courseId).then(course => {setCourseName({title: course.title})})
    }, [courseId]);


    console.log("edit layout")
    return(
        <Provider store={store}>
            <div className="container-fluid">
                <div>
                    <h2>
                        <a href={`/courses/${layout}`}  className="fa fa-arrow-left"></a>
                        {courseName.title}
                    </h2>
                </div>
                <br/>
                <div className="row">
                    <div className="col-4">
                        <ModuleList/>
                    </div>
                    <div className='col-8'>
                        <LessonTabs/>
                        <br/>
                        <TopicPills/>
                        <br/>
                        <WidgetList/>
                    </div>
                </div>
            </div>
        </Provider>
    )}



export default CourseEditor