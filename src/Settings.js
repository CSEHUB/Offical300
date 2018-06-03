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
            <div className="container-fluid">
                <Router>
                    <div className="row">
                        <div className="col-md-8 offset-md-2 settings-wrapper">
                            <div className="settings-outer">
                                <div className="settings-inner">
                                <div><h3>Settings</h3></div>
                                    <div><h4>Delete Workspaces:</h4></div>


                                    <ul className="removeWorkspaceWrapper">

                                    {this.state.courses.map((courseTitle, arrayIndex) => {
                                        return (
                                            <li className="removeWorkspaceItem"><div className="removeWorkspaceName">{courseTitle}</div><div className="minusWorkspace"><i onClick={this.rmWorkspace.bind(this, arrayIndex)}  className="fas fa-minus-circle"></i></div></li>
                                        )
                                    })}

                                    </ul>

                                    <div><h4>Change App Background Color</h4></div>

                                </div>
                            </div>
                        </div>
                    </div>
                </Router>
            </div>

        );
    }
}

export default Settings;