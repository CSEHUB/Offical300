import React from 'react';
import Quarter from './Quarter'
import '../static/css/style.css'

export default class OneYearPlan extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="container-fluid">

                <div id="planningTable" className="row">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <Quarter qt="FA" yr={this.props.yr} />
                        </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <Quarter qt="WI" yr={this.props.yr} />
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <Quarter qt="SP" yr={this.props.yr} />
                    </div>
                </div>
            </div>
        )
    }
}
