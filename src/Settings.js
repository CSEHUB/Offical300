//----------------MVC - EXAMPLE------------
import './App.css'
import React, {Component} from 'react';
import firebase from 'firebase';
import 'firebase/database';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from 'react-router-dom'

import {Dashboard} from "./Dashboard";

export class Settings extends Component {
    constructor(props) {
        super(props);
        this.state ={
            user : null,
            courses : new Array(),
            courseKeys : new Array(),
            position : new Array()
        };
    }

    //Function to remove a workspace from firebase, and website.
    async rmWorkspace(param) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                //get workspace key
                var workspaceID = this.state.courseKeys[param];
                //get workspace string name (given by user)
                var userWorkspaceID = this.state.courses[param];

                //remove workspace from main database workspaces
                var path = `workspaces/`;
                const ref = firebase.database().ref(path);
                //console.log("Removing overall workspace: " + ref.child(workspaceID));
                ref.child(workspaceID).remove();

                //remove from workspace from user
                var path2 = '/users/' + user.uid + '/workspace/';
                const ref2 = firebase.database().ref(path2);
                ref2.child(userWorkspaceID).remove();
            }
        });
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
                        console.log(snapshot.val());
                        if(snapshot.val()!=null) {
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
                        }
                    });
                });
            }

        });
    }

    listenDelete(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var userId = user.uid;
                this.state.user = user.uid;
                var getData = firebase.database().ref('/users/' + userId + '/workspace');
                var temp = new Array();
                getData.on("child_removed", (snapshot) => {
                    var deletedCourse = snapshot.key;
                    var deletedKey = snapshot.val();
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
            <Router>
            <div className="container-fluid">

                    <div className="row">
                        <div className="col-md-8 offset-md-2 settings-wrapper">
                            <div className="settings-outer">
                                <div className="settings-inner">
                                    <div><h3><b>Settings</b></h3></div>
                                    <div className="deleteWorkspaceWrapper"><h4>Delete Workspaces:</h4>
                                    <ul className="removeWorkspaceWrapper">


                                        {/* MODEL - Dynamically load workspaces from firebase.  */}
                                        {/* VIEW - li tags  with option on hover to delete course*/}
                                        {/* CONTROLLER - delete from database on click, but before load modal for "are you sure"*/}
                                    {this.state.courses.map((courseTitle, arrayIndex) => {
                                        return (

                                            <li className="removeWorkspaceItem"><div className="removeWorkspaceName">{courseTitle}</div><div className="minusWorkspace"><i data-toggle="modal" data-target={'#' + this.state.courseKeys[arrayIndex]} className="fas fa-minus-circle"></i></div></li>
                                        )
                                    })}
                                    </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                {/* ----------- LOADING MODALS (initially hidden)-------*/}
                {/* MODEL - Dynamically modal load workspaces from firebase.  */}
                {/* VIEW - modal pops up in center of screen to verify delete course*/}
                {/* CONTROLLER - delete from database on confirm click*/}
                    {this.state.courses.map((courseTitleModal, arrayIndex) => {
                        return (

                    <div className="modal fade" id={this.state.courseKeys[arrayIndex]} tabIndex="-1" role="dialog"
                         aria-labelledby="deleteWorkspace" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Delete Workspace:</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">

                                    <p>Are you sure you want to delete workspace: {courseTitleModal}?</p>

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel
                                    </button>
                                    <button onClick={this.rmWorkspace.bind(this, arrayIndex)} type="button" className="btn btn-primary" data-dismiss="modal">Delete Workspace</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    )
                    })}




                {/* Add Workspace Modal */}
                <div className="modal fade" id="modal-addWebsite" tabIndex="-1" role="dialog"
                     aria-labelledby="AddWebsite" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Add New Workspace:</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <form>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Title: </label>
                                        <input id="course" type="text" className="form-control"
                                               placeholder="ex: CSE 110"/>
                                    </div>
                                </form>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel
                                </button>
                                <button onClick={Dashboard.makeWorkspace.bind(this,this.props)} type="button" className="btn btn-primary" data-dismiss="modal">Save Course</button>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
            </Router>
        );
    }
}

export default Settings;