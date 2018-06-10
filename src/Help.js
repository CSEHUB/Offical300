//--------------Layering example ------------------
import './App.css'
import React, {Component} from 'react';
import 'firebase/database';
import {
    BrowserRouter as Router,
} from 'react-router-dom'
import {Dashboard,makeWorkspace} from "./Dashboard";



//Layering - This file is called/rendered from Dashboard.js when URL routing = './help'
export class Help extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <Router>
            <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8 offset-md-2 settings-wrapper">
                            <div className="settings-outer">
                                <div className="settings-inner">
                                    <div><h3>Help/Tutorial</h3></div>
                                    <br></br>
                                    <iframe className="w100" height="425" src="https://www.youtube.com/embed/WhrsY3CfpBI"
                                            frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                                </div>
                            </div>
                        </div>
                    </div>

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
                                    <button onClick={Dashboard.makeWorkspace} type="button" className="btn btn-primary" data-dismiss="modal">Save Course</button>
                                </div>
                            </div>
                        </div>
                    </div>

            </div>
            </Router>
        );
    }
}

export default Help;