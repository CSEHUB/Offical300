import './App.css'
import logo from './res/images/Logo.png'
import Widget from './Widget.js';
import {Header, Widget1} from './Header';
import React, {Component} from 'react';
import ReactDOM from "react-dom";
import firebase from 'firebase';
import 'firebase/database';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from 'react-router-dom'


export class Help extends Component {

    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div className="container-fluid">
                <Router>
                    <div className="row">
                        <div className="col-md-8 offset-md-2 settings-wrapper">
                            <div className="settings-outer">
                                <div className="settings-inner">
                                    <div><h3>Help/Tutorial</h3></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Router>
            </div>

        );
    }
}

export default Help;