import './App.css'
import firebase from 'firebase';
import logo from './Logo.png'
import Widget from './Widget.js';
import {Header, Widget1} from './Header';
import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from 'react-router-dom'
import {FIREBASE_CONFIG} from "./config";

require('firebase');


var courses = ['CSE100', 'CSE110', 'CSE20', 'CSE30'];


function addWidget(param) {
    {/* This removes any widgets that may be from a different class
    <li onClick={addWidget.bind(this, childData.course)}><NavLink to={childData.course}
                                                                                         className="menu-item mih"
                                                                                         activeClassName="activeMenuItem">{childData.course}</NavLink>
                                </li>



  {


                            firebase.auth().onAuthStateChanged(user => {

                            if (user) {
                            var userId = firebase.auth().currentUser.uid;
                            var getData = firebase.database().ref('/users/' + userId);

                            getData.once('value', function (snapshot) {

                           const allCourses =  snapshot.forEach(function (childSnapshot, index) {
                            var childData = childSnapshot.val();

                                <div>
                               <div>test</div>
                                    <li onClick={addWidget.bind(this, childData.course)}><NavLink to={childData.course} className="menu-item mih" activeClassName="activeMenuItem" >{childData.course}</NavLink></li>
                                </div>

                        });

                                console.log({allCourses});
                           ReactDOM.render(<div>{allCourses}</div>, document.getElementById("bottom"));


                        });
                        }

                        })
                        }
    */}
    ReactDOM.unmountComponentAtNode(document.getElementById('bottom'));


    {/* Render the course widgets */}
    ReactDOM.render(<Widget1 name={param}></Widget1>, document.getElementById('bottom'));
}

class SideMenu extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return <div className="container-fluid">
            <Router>
                <nav className="menu-side">
                    <ul className="menu-side-list">
                        <li className="menu-main-item">
                            <div className="menu-icons"><i className="fas fa-th-large"></i></div>
                            Workspaces <div className="addWorkspace ml-auto" data-toggle="modal"
                                            data-target="#modal-addWebsite">+</div></li>

                        {/* Button trigger modal */}

                        {/* We need to loop data and populate this format with course name in them */}

                        {


                            firebase.auth().onAuthStateChanged(user => {

                            if (user) {
                            var userId = firebase.auth().currentUser.uid;
                            var getData = firebase.database().ref('/users/' + userId);

                            getData.once('value', function (snapshot) {

                           const allCourses =  Object.keys(snapshot).map(function(keyName, keyIndex){
                            var childData = snapshot.val();
                            var course = childData.course;

                               console.log("Snapshot: " + {childData} + {course});
                               return(
                                   <div onClick={addWidget.bind(this, childData.course)}><NavLink to={childData.course} className="menu-item mih" activeClassName="activeMenuItem" >{childData.course}</NavLink></div>

                               )

                        });

                                console.log({allCourses});
                                return(
                           <div>{allCourses}</div>
                                )


                        });
                        }

                        })
                        }


                        {/* Lower portion of side menu */}
                        <br></br>
                        <br></br>
                        <div className="border"></div>
                        <br></br>

                        <li><NavLink to="/app/settings" className="menu-main-item mih" activeClassName="activeMenuItem">
                            <div className="menu-icons"><i className="fas fa-cog"></i></div>
                            Settings</NavLink></li>
                        <li><NavLink to="/help" className="menu-main-item mih" activeClassName="activeMenuItem">
                            <div className="menu-icons"><i className="fas fa-question"></i></div>
                            Help</NavLink></li>
                    </ul>
                </nav>
            </Router>
        </div>;
    }
}

export default SideMenu;

