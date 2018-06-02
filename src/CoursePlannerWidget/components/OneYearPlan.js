import React from 'react';
import Quarter from './Quarter'
import '../static/css/style.css'

export default class OneYearPlan extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <table id="planningTable">
                    <tr>
                        <td>
                            <Quarter qt="FA" yr={this.props.yr} />
                        </td>
                        <td>
                            <Quarter qt="WI" yr={this.props.yr} />
                        </td>
                        <td>
                            <Quarter qt="SP" yr={this.props.yr} />
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}
