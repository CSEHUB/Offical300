import './App.css'
import logo from './res/images/Logo.png'
import Widget from './Widget.js';
import {Header, Widget1} from './Header';
import React, {Component} from 'react';
import ReactDOM from "react-dom";
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import {Settings} from "./Settings";
import {Help} from "./Help.js";
import 'firebase/database';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from 'react-router-dom'
import {Homepage} from "./Homepage";
import FourYearPlan from "./CoursePlannerWidget/components/FourYearPlan";
import {defWorkspace} from "./defWorkspace";

var courses = new Array();

export var last_position = 0;

function addWidget(param) {
    {/* This removes any widgets that may be from a different class */}
    ReactDOM.unmountComponentAtNode(document.getElementById('bottom'));

    {/* Render the course widgets */}
    ReactDOM.render(<Widget1 name={param}></Widget1>, document.getElementById('bottom'));
}


function openFourYearPlanner() {
    {/* This removes any widgets that may be from a different class */}
    ReactDOM.unmountComponentAtNode(document.getElementById('bottom'));

    {/* Render the settings page */}
    ReactDOM.render(<FourYearPlan/>, document.getElementById('bottom'));
}


function openSettings() {
    {/* This removes any widgets that may be from a different class */}
    ReactDOM.unmountComponentAtNode(document.getElementById('bottom'));

    {/* Render the settings page */}
    ReactDOM.render(<Settings/>, document.getElementById('bottom'));
}

function openHelp() {
    {/* This removes any widgets that may be from a different class */}
    ReactDOM.unmountComponentAtNode(document.getElementById('bottom'));

    {/* Render the settings page */}
    ReactDOM.render(<Help/>, document.getElementById('bottom'));
}

export function logout(){
    firebase.auth().signOut().then(function() {
        ReactDOM.unmountComponentAtNode(document.getElementById('topNav'));
        ReactDOM.unmountComponentAtNode(document.getElementById('menu-side'));
        ReactDOM.unmountComponentAtNode(document.getElementById('bottom'));
        ReactDOM.unmountComponentAtNode(document.getElementById('signin'));
        ReactDOM.unmountComponentAtNode(document.getElementById('homepage'));
        ReactDOM.render(<Homepage />,document.getElementById('homepage'));
    }).catch(function(error) {
        console.log(error);
    });
}


export class SideMenu extends Component {

    constructor(props) {
        super(props);
        this.state ={
            user : null,
            courses : new Array(),
            courseKeys : new Array(),
            position : new Array()
        };
    }

    componentWillMount(){
        this.listenDelete();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user});
                var userId = user.uid;
                var getData = firebase.database().ref('/users/' + userId + '/workspace');
                var temp = new Array();
                getData.on('child_added', (snapshot, prevChildKey) => {
                    console.log(snapshot.key);
                    var name = snapshot.key;
                    var key = snapshot.val();
                    var workspaceData = firebase.database().ref('/workspaces/'+snapshot.val());
                    workspaceData.once('value',(snapshot)=>{
                        if(snapshot.val()!=null) {
                            console.log(snapshot.val());
                            var position = snapshot.val().position;
                            this.setState(prevState => {
                                var positionArray = prevState.position.slice();
                                var courseArray = prevState.courses.slice();
                                var courseKeyArray = prevState.courseKeys.slice();
                                positionArray.push(position);
                                courseArray.push(name);
                                courseKeyArray.push(key);

                                console.log(positionArray);
                                for (var i = 0; i < positionArray.length - 1; i++) {
                                    for (var j = i + 1; j < positionArray.length; j++) {
                                        if (positionArray[i] > positionArray[j]) {
                                            var temp1 = positionArray[i];
                                            var temp2 = courseArray[i];
                                            var temp3 = courseKeyArray[i];
                                            positionArray[i] = positionArray[j];
                                            courseArray[i] = courseArray[j];
                                            courseKeyArray[i] = courseKeyArray[j];
                                            positionArray[j] = temp1;
                                            courseArray[j] = temp2;
                                            courseKeyArray[j] = temp3;
                                            console.log(positionArray);
                                        }
                                    }
                                }
                                return {
                                    position: positionArray,
                                    courses: courseArray,
                                    courseKeys: courseKeyArray
                                };
                            });
                            if (last_position < position) {
                                last_position = position;
                            }
                        }
                    });
                });
            }

        });
    }

    listenDelete(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user});
                var userId = user.uid;
                this.state.user = user.uid;
                var getData = firebase.database().ref('/users/' + userId + '/workspace');
                var temp = new Array();
                getData.on("child_removed", (snapshot) => {
                    console.log("snapshot:");
                    console.log(snapshot.val());
                    console.log(snapshot.key);
                    var deletedCourse = snapshot.key;
                    var deletedKey = snapshot.key;
                    var courseIndex = this.state.courses.indexOf(deletedCourse);
                    var keyIndex = this.state.courseKeys.indexOf(deletedKey);
                    this.setState(prevState => {
                        let newCourses = prevState.courses.slice();
                        let newKeys = prevState.courseKeys.slice();
                        let newPosition = prevState.position.slice();
                        newCourses.splice(courseIndex,1);
                        newKeys.splice(keyIndex,1);
                        newPosition.splice(courseIndex,1);
                        return {
                            position : newPosition,
                            courses : newCourses,
                            courseKeys: newKeys
                        }
                    });
                });
            }
        });
    }

    render(){
        return(
            <div className="container-fluid">
                <Router>
                    <nav className="menu-side">
                        <ul className="menu-side-list">
                            {/* Logo portion of Nav, to match sidebar */}
                                <div className="logo">
                                    <img id="Logo" src={logo}/>
                                </div>
                            <li className="menu-main-item"><div className="menu-icons"><i className="fas fa-th-large"></i></div>Workspaces <div className="addWorkspace ml-auto" data-toggle="modal" data-target="#modal-addWebsite">+</div></li>
                            {/* Button trigger modal */}

                            {/* We need to loop data and populate this format with course name in them */}

                            {this.state.courses.map((courseTitle, arrayIndex) => {
                                return (
                                    <li onClick={addWidget.bind(this, courseTitle)}><NavLink exact to={"/dashboard/course/" + courseTitle} className="menu-item mih" activeClassName="activeMenuItem" >{courseTitle}</NavLink></li>
                                )
                            })}

                            {/* Lower portion of side menu */}
                            <br></br>
                            <br></br>
                            <br></br>
                            <li onClick={openFourYearPlanner}><NavLink exact to="/dashboard/planner" className="menu-main-item mih" activeClassName="activeMenuItem"><div className="menu-icons"><i className="fas fa-sticky-note"></i></div><span className="pad-left-settings">Planner</span></NavLink></li>
                            <br></br>

                            <div className="border"></div>

                            <li onClick={openSettings}><NavLink exact to="/dashboard/settings" className="menu-main-item mih" activeClassName="activeMenuItem"><div className="menu-icons"><i className="fas fa-cog"></i></div><span className="pad-left-settings">Settings</span></NavLink></li>
                            <li onClick={openHelp}><NavLink exact to="/dashboard/help" className="menu-main-item mih" activeClassName="activeMenuItem"><div className="menu-icons"><i className="fas fa-question"></i></div> <span className="pad-left-help">Help</span></NavLink></li>
                            <li onClick={logout}><NavLink exact to="/" className="menu-main-item mih" activeClassName="activeMenuItem"><div className="menu-icons"><i className="fas fa-sign-out-alt"></i></div>Sign out</NavLink></li>

                        </ul>
                    </nav>
                </Router>
            </div>

        );
    }
}

export default SideMenu;
