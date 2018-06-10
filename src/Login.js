import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import 'firebase/database';
import '../node_modules/firebaseui/dist/firebaseui.css';
import {FIREBASE_CONFIG} from "./config";


var app = firebase.initializeApp(FIREBASE_CONFIG);

firebase.auth().onAuthStateChanged( user => {
    if (user) {
        // If user state changes and 'user' exists, check Firebase Database for user
        const userReference = app.database().ref(`users/${user.uid}`);

        userReference.once('value', snapshot => {
            if (!snapshot.val()) {
                // User does not exist, create user entry
                userReference.set({
                    "email":firebase.auth().currentUser.email,
                    "last_workspace":'',
                    "workspace":''
                });
            }
        });
    }
});

class Login extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        var uiConfig = {
            signInSuccessUrl: '/dashboard',
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
            // Terms of service url.
            tosUrl: '<your-tos-url>'
        };

        // Initialize the FirebaseUI Widget using Firebase.
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);
    }
    render(){
        return (
           <div>
            <div className="centerWrapper">
            <dev className="full-w-h" id="firebaseui-auth-container"></dev>
            </div>
           </div>
        );
    }
}
export default Login;
