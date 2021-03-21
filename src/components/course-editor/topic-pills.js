import React,{useEffect} from 'react'
import {connect} from "react-redux"
import EditableItem from "../editable-item"
import {useParams} from "react-router-dom"
import topicService from "../../services/topic-service"

const TopicPills = ({
                        topics = [],
                        findTopicsForLesson,
                        createTopicForLesson,
                        deleteTopic,
                        updateTopic,
                        setTopicToEmpty
                    }) => {
    const {layout,courseId, moduleId, lessonId, topicId} = useParams();
    useEffect( () => {
        if (lessonId != "undefined" &&
            typeof lessonId != "undefined" &&
            moduleId != "undefined" &&
            typeof moduleId != "undefined" ) {
            findTopicsForLesson(lessonId)
        } else {
            setTopicToEmpty(topicId)
        }
    }, [lessonId, moduleId])
    return(
        <div className="p-3 bg-dark text-white">
            <h3> Topics</h3>
            <ul className="nav nav-pills bg-light">
                {
                    topics.map(topic =>
                        <li className="nav-item active" key={`${topic._id}`}>
                            <EditableItem
                                to={`/courses/${layout}/editor/${courseId}/${moduleId}/${lessonId}/${topic._id}/widgets`}
                                deleteItem={deleteTopic}
                                updateItem={updateTopic}
                                item={topic}
                                active={topic._id === topicId}/>
                        </li>
                    )
                }
                <li>
                    <i onClick={() => createTopicForLesson(lessonId, moduleId)} className="fas fa-plus-circle fa-2x text-danger"></i>
                </li>
            </ul>
        </div>

    )
}

const stpm =(state) => ({
    topics: state.topicReducer.topics
})

const dtpm = (dispatch) => {
    return {
        deleteTopic: (topic) => topicService.deleteTopic(topic._id)
            .then(status => dispatch({
                type: "DELETE_TOPIC",
                topic:topic
            })),
        updateTopic: (topic) =>
            topicService.updateTopic(topic._id, topic)
                .then(status => dispatch({
                    type: "UPDATE_TOPIC",
                    topic: topic
                })),
        createTopicForLesson: (lessonId, moduleId) => {
            if (!(lessonId != "undefined" &&
                typeof lessonId != "undefined" && moduleId != "undefined" && typeof moduleId != "undefined")){
                alert("Please select a lesson first to add the topic to")
            } else {topicService.createTopicForLesson(lessonId, {title: "New Topic"})
                .then(theActualTopic => dispatch({
                    type: "CREATE_TOPIC",
                    topic: theActualTopic
                }))}},
        findTopicsForLesson: (lessonId) => {
            topicService.findTopicsForLesson(lessonId)
                .then(topics => dispatch({
                    type: "FIND_TOPIC_FOR_LESSON",
                    topics : topics})
                )
        },
        setTopicToEmpty: (topicId) => dispatch({
            type: "CLEAN_TOPIC"
        })


    }
}

export default connect(stpm, dtpm)(TopicPills)