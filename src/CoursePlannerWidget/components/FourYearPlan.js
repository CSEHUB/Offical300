import React from 'react';
import OneYearPlan from './OneYearPlan'
import {makeWorkspace} from "../../Dashboard";

export default class FourYearPlan extends React.Component {
    render() {
        return(
            <div className="container-fluid" id="fullWidget">
                <OneYearPlan yr="1" />
                <OneYearPlan yr="2" />
                <OneYearPlan yr="3" />
                <OneYearPlan yr="4" />


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
        );
    }
}