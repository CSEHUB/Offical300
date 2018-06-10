import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import Login from './Login';
import {Homepage} from './Homepage'
import {Header, Widget1} from './Header';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import {Dashboard} from "./Dashboard";

const initApp = function() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                user.getIdToken().then(function (accessToken) {
                    ReactDOM.render(
                        <Router>
                            <div>
                                <Route exact path="/" render={(props)=> (
                                    <Redirect to="/dashboard" />
                                )}/>
                            </div>
                        </Router>, document.getElementById('bottom')
                    );


                    {/* 2.) Load login screen*/
                    }
                    ReactDOM.render(
                        <Router>
                            <div>
                                <Route exact path="/login" render={(props)=> (
                                    <Redirect to="/dashboard" />
                                )}/>
                            </div>
                        </Router>, document.getElementById('bottom')
                    );
                                    
                    {/* 4.) Load course on URL refresh/direct link*/
                    }
                    ReactDOM.render(
                        <Router>
                            <div>
                                <Route path='/(|login|dashboard)' render={(props) => (
                                    <Dashboard {...props} />
                                )}/>

                            </div>
                        </Router>, document.getElementById('bottom')
                    );
                });
            } else {
                ReactDOM.render(
                    <Router>
                        <div>
                            <Route exact path="/" component={Homepage}/>
                        </div>
                    </Router>, document.getElementById('homepage')
                );


                {/* 2.) Load login screen*/
                }
                ReactDOM.render(
                    <Router>
                        <div>
                            <Route exact path="/(login|dashboard)" component={Login}/>
                        </div>
                    </Router>, document.getElementById('signin')
                );


                {/* PROB CAN COMBINE 3 and 4 below if we come up with a smart string instead of dashboard (like app or my) to put after root url*/
                }


                {/* 4.) Load course on URL refresh/direct link*/
                }
                /*ReactDOM.render(
                    <Router>
                        <div>
                            <Route exact path='/dashboard' component={Login} />

                        </div>
                    </Router>, document.getElementById('signin')
                );*/

            }
        }, function (error) {
            console.log(error);
        });
};

window.addEventListener('load', function() {
    initApp();
});
{/* 1.) Initially Load homepage*/}


registerServiceWorker();
