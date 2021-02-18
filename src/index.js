import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import * as serviceWorker from './serviceWorker';

import CourseManagerComponent from "./components/CourseManagerComponent";


ReactDOM.render(
    <CourseManagerComponent/>,
    document.getElementById('root')
);

serviceWorker.unregister();
