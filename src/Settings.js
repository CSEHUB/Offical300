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
import {makeWorkspace} from "./Dashboard";


export class Settings extends Component {


    constructor(props) {
        super(props);
        this.state ={
            user : null,
            courses : new Array(),
            courseKeys: new Array()
        };
    }

    //Function to remove a workspace from firebase, and website.
    async rmWorkspace(param) {
        //get workspace key
        var workspaceID = this.state.courseKeys[param];
        //get workspace string name (given by user)
        var userWorkspaceID = this.state.courses[param];

        //remove workspace from main database workspaces
        var path = `workspaces/`;
        //console.log(path);
        const ref = await firebase.database().ref(path);
        //console.log("Removing overall workspace: " + ref.child(workspaceID));
        ref.child(workspaceID).remove();

        //remove from workspace from user
        var path2 = '/users/' + this.state.user + '/workspace/';
        const ref2 = await firebase.database().ref(path2);
        //console.log("Removing user workspace: " + ref.child(path2 +  userWorkspaceID));
        ref2.child(userWorkspaceID).remove();

        //Re render widgets on deletion  of widget.
        window.location.reload(); //Will change later.
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user});
                var userId = user.uid;
                this.state.user = user.uid;
                var getData = firebase.database().ref('/users/' + userId + '/workspace');
                var temp = new Array();
                getData.on('child_added', (snapshot, prevChildKey) => {
                    console.log("snapshot:");
                    console.log(snapshot.val());
                    console.log(snapshot.key);
                    this.setState(prevState => ({
                        courses : [...prevState.courses, snapshot.key],
                        courseKeys: [...prevState.courseKeys, snapshot.val()]
                    }));
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

                                    {this.state.courses.map((courseTitle, arrayIndex) => {
                                        return (
                                            <li className="removeWorkspaceItem"><div className="removeWorkspaceName">{courseTitle}</div><div className="minusWorkspace"><i data-toggle="modal" data-target={'#' + this.state.courseKeys[arrayIndex]} className="fas fa-minus-circle"></i></div></li>
                                        )
                                    })}

                                    </ul>

                                    </div>

                                    <div><h4>Change App Background Color</h4></div>

                                </div>
                            </div>
                        </div>
                    </div>




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
                                <button onClick={makeWorkspace} type="button" className="btn btn-primary" data-dismiss="modal">Save Course</button>
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