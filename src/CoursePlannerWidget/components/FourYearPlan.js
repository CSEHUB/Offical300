import React from 'react';
import OneYearPlan from './OneYearPlan'

export default class FourYearPlan extends React.Component {
    render() {
        return(
            <div className="container-fluid" id="fullWidget">
                <OneYearPlan yr="1" />
                <OneYearPlan yr="2" />
                <OneYearPlan yr="3" />
                <OneYearPlan yr="4" />
            </div>
        );
    }
}