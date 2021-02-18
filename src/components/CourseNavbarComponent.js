import React from "react";

export default class CourseNavbarComponent extends React.Component {

    state = {
        title: "New Course"
    }

    render() {
        return (
        <div>
            <nav className="navbar navbar-expand-sm fixed-top">
                <a className="navbar-brand d-none d-sm-block" href="#">Course Manager</a>
                <button className="navbar-toggler wbdv-field wbdv-hamburger"
                        type="button"
                        data-toggle="collapse"
                        data-target="#hidden-dropdown">
                    <span className="navbar-toggler-icon"/>
                </button>

                <form className="form-inline">
                    <label htmlFor="title-fld" className="wbdv-label wbdv-course-manager"/>
                    <div className="input-group">

                        <input type="text"
                               id="title-fld"
                               className="form-control"
                               onChange={(e) => {
                                   const newTitle = e.target.value
                                   this.setState({title: newTitle})
                               }}
                               // value={this.state.title}
                               placeholder="New course title"/>

                        <div className="input-group-append">
                            <button className="btn btn-success" onClick={() => this.props.addCourse(this.state.title)} type="button">
                                +
                            </button>
                        </div>
                    </div>
                </form>

            </nav>

            <button className="btn btn-success"
                    style={{position: "fixed", bottom: 0, right: 0}}
                    onClick={() => this.props.addCourse(this.state.title)}><i className="fa fa-plus-circle"/></button>

        </div>

        )
    }

}