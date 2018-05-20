import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';

// File to mess around with put/patch/delete/post with User data

class DatabaseTest extends Component {

    // Get a reference to the database service
    var database = firebase.database();

    function static writeUserData(email, courses, widgets) {
        firebase.database().ref('users/' + email).set({
            email: email,
            courses: courses,
            widgets: widgets
        });
    }

    function static makeNewWidget(course, URL, account, password ) {
        // A new widget (database)
        var widgetData = {
            name: name,
            course: course,
            URL: URL,
            account: account,
            password: password
        };

        // Get a key for a new Widget.
        var newWidgetKey = firebase.database().ref().child('widgets').push().key;

        // Write the new widget's data simultaneously in the widgets list and the user's widget list.
        var updates = {};
        updates['/widgets/' + newWidgetKey] = widgetData;
        updates['/user-widgets/' + name + '/' + newWidgetKey] = widgetData;

        return firebase.database().ref().update(updates);
    }
}

export default DatabaseTest;