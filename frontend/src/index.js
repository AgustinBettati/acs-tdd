import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CourseForm from './components/CourseForm/courseForm.tsx'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from "./components/home/coursesTable";
import {Route} from "react-router";
import UpdateForm from "./components/UpdateForm/updateForm";


const App = () => {
    return (
        <Router>
            <Route path="/course" component={CourseForm} />
            <Route path="/home" component={Home} />
            <Route path="/" component={Home} />
            <Route path="/update" component={UpdateForm} />
        </Router>)
};
ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
