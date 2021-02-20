import React from "react";

export default class CourseNavbar extends React.Component {

    state = {
        title: "New Course"
    }

    render() {
        return (
        <div>
            <nav className="justify-content-start navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
                <em class="fa fa-bars fa-3x wbdv-field wbdv-hamburger d-block text-light"></em>
                <a className="navbar-brand col-2 d-none d-lg-block d-xl-block" href="#">Course Manager</a>
                <form className="form-inline">
                    <label htmlFor="title-fld" className="wbdv-label wbdv-course-manager"/>
                    <div className="input-group justify-content-start pl-3 col-xs-15 col-md-15 col-sm-15 col-15">
                        <input type="text"
                               id="title-fld"
                               className="form-control float right"
                               onChange={(e) => {
                                   const newTitle = e.target.value
                                   this.setState({title: newTitle})
                               }}
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