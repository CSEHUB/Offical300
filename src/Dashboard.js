//----------------MVC - EXAMPLE------------
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Widget1} from './Header';
import {SideMenu, last_position} from "./SideMenu";
import {Settings} from "./Settings";
import {Help} from "./Help.js";
import firebase from 'firebase';
import 'firebase/database';
import '../node_modules/firebaseui/dist/firebaseui.css';
import {
    Route
} from 'react-router-dom'
import FourYearPlan from "./CoursePlannerWidget/components/FourYearPlan";
import {defWorkspace} from "./defWorkspace";


export class Dashboard extends Component {


    //---------------------MVC - Model (data/logic for handling routing and data)-----------------
    constructor(props) {
        super(props);
        this.state = {
            user : null,
            workspace : new Array()
        };
        ReactDOM.render(<SideMenu />, document.getElementById('menu-side'));
        //get url
        var path = props.location.pathname;
        //split url string into array of parts (each part is between /.../)
        var pathParts = path.split('/');
        //get first part (which is the page type "ex: dashboard, settings, course, login etc..."
        var pageType = pathParts[2];
        //if page is equal to a course page, we know that we need to load widgets in the bottom right section



        //------------------------MVC - View (Display modal for add workspace on click) --------------------------
        if(pageType == "course") {
            //get course Name (so we know which widgets to load)
            var courseName = pathParts[3];
            //Load widgets component, passing in that course name as a prop to load it's widgets
            ReactDOM.render(<Widget1 name={courseName}></Widget1>, document.getElementById('bottom'));
        }
        else if(pageType == "planner"){
            ReactDOM.render(<FourYearPlan name={courseName}></FourYearPlan>, document.getElementById('bottom'));
        }
        else if(pageType == "settings"){
            ReactDOM.render(<Settings name={courseName}></Settings>, document.getElementById('bottom'));
        }
        else if(pageType == "help"){
            ReactDOM.render(<Help name={courseName}></Help>, document.getElementById('bottom'));
        }
    }
    static makeWorkspace() {
        var course = document.getElementById("course").value;
        if(course == ""){
            return;
        }
        firebase.auth().onAuthStateChanged( (user) => {
            if (user) {
                const userReference = firebase.database().ref(`users/${user.uid}`);
                var position = last_position + 1;
                var widgets='';
                var data = {
                    'name':course,
                    'position':position,
                    'widgets':widgets
                }
                var wid = firebase.database().ref('workspaces').push(data).getKey();
                userReference.child("workspace").child(course).set(wid);
                var newWorkspace = defWorkspace(wid,course,position,widgets);
            }

        });
    }

    //------------------------MVC - View (Display modal for add workspace on click) --------------------------
    render(){
        return(
        <Route>
                <div>
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

                                    {/* -------------------------------MVC - Controller - add new workspace onClick---------------------------------*/}

                                    <button onClick={Dashboard.makeWorkspace} type="button" className="btn btn-primary" data-dismiss="modal">Save Workspace</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </Route>
        );
    }
}
