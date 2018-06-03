import React from 'react'
import CourseList from './CourseList';
import firebase from 'firebase';

export default class Quarter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hours: 0
        };

        var config = {
            apiKey: "AIzaSyA9E4iXG-mSr3Q-UIHf6UXbsxh3PlCaXkM",
            authDomain: "courselist-6c0e9.firebaseapp.com",
            databaseURL: "https://courselist-6c0e9.firebaseio.com",
            projectId: "courselist-6c0e9",
            storageBucket: "courselist-6c0e9.appspot.com",
            messagingSenderId: "986693128490"
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    }

    // Callback function for updating number of hours of work
    hoursCallback = (hoursChange) => {
        var newHours = this.state.hours += hoursChange;

        newHours = Math.round(newHours * 100) / 100;

        this.setState ({hours: newHours });
    }


    componentDidUpdate() {
        localStorage.setItem(this.props.yr.concat(this.props.qt).concat("qt"), JSON.stringify(this.state));
    }

    componentDidMount() {
        const data = localStorage.getItem(this.props.yr.concat(this.props.qt).concat("qt"))
        if(data) {
            this.setState(prevState => {
                return JSON.parse(data)
            })
        }
    }

    render () {
        return(
            <div className="quarter">

                    <h4>
                        <b>
                        {this.props.qt} Quarter
                    </b>
                    </h4>
                    <p>
                        {this.state.hours} hours per week
                    </p>


                    <CourseList qt={this.props.qt} yr={this.props.yr}
                                timeChangeCallback={this.hoursCallback} db={firebase} />

            </div>
        );
    }

}