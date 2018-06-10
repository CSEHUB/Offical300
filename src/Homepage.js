import './App.css'
import logo from './res/images/Logo.png'
import bkImg from './res/images/homepageGeisel.jpg'
import dashImg from './res/images/dashboard-sample.png'
import teamImg from './res/images/teamPhoto.jpg'
import techLogosImg from './res/images/allLogos.png'
import Widget from './Widget.js';
import React from 'react';

import lucasProfileImg from './res/images/Members/lucas.jpg'
import chrisProfileImg from './res/images/Members/chris.jpg'
import mahibProfileImg from './res/images/Members/mahib.jpg'
import kevinProfileImg from './res/images/Members/kevin.jpg'
import shaneProfileImg from './res/images/Members/shane.jpg'
import jasonProfileImg from './res/images/Members/jason.jpg'
import ericProfileImg from './res/images/Members/eric.jpg'
import andrewProfileImg from './res/images/Members/andrew.png'
import yeProfileImg from './res/images/Members/ye.png'
import moProfileImg from './res/images/Members/mo.jpg'
import garyProfileImg from './res/images/Members/gary.jpeg'

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

{/* Used for image styling in CSS */}
var backgroundImg = {
    backgroundImage: 'url(' + bkImg + ')'
};

var teamBackgroundImg = {
    backgroundImage: 'url(' + teamImg + ')'
};

var noShow = {
    display:'none'
};

export const Homepage = () => {
    return (
        <Router>
            <div>

            <main role="main">
                <div style={backgroundImg} className="jumbotron hp-background bk-fixed geisel">
                    <div className="container ptm70">
                        <h1 className="display-3">Welcome to CSE HUB!</h1>
                        <p className="c-white">Created for UCSD CSE Students, by CSE Students. With the rigorous CSE coursework, CSE HUB makes your life as a CSE student easier by
                        consolidating all of your class websites into one place.</p>
                        <p className="form-inline pd50">
                            <div className="p10"><a className="home-btn" href="./login" role="button">Register</a></div>
                            <div className="p10"><a className="home-btn" href="./login" role="button">Login</a></div>
                        </p>
                    </div>
                </div>

                    <div className="container">
                        <div className="homedashImg-h">
                            <div className="dis-none" id="dashboardEx">
                            <div className="row pt65">
                                <div className="col-md-12 text-center">
                                    <h2>Get things done, faster.</h2>
                                </div>
                            </div>

                        <div className="row pt45">
                            <div className="col-md-12 text-center">
                                <img className="homedashImg" src={dashImg}/>
                            </div>
                            <div className="col-md-10 text-center offset-md-1">
                                <p className="pt45 pdm15">With CSE HUB, all your coursework is at your fingertips. You can
                                    create page layouts for all your courses
                                    (which we call workspaces) and then add numerous widgets to each course.</p>

                                <p className="pt30"><a className="home-btn" href="#" role="button" data-toggle="modal" data-target="#modal-youtubeTutorial">Learn more</a></p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>

                <div style={teamBackgroundImg} className="jumbotron hp-background mt65">
                    <div className="container text-center">
                        <h3 className="display-3">Meet team HUB</h3>
                    </div>
                </div>

                <div className="container">

                    <div className="row pt30 text-center">
                        <div className="col-md-12">
                            <h2><u>H</u>olistically <u>U</u>nified <u>B</u>oys</h2>
                        </div>
                    </div>

                    <div className="row text-center pt20">
                        <div className="col-md-3">
                            <img className="profilePhoto" src={lucasProfileImg}/>
                            <h4>Lucas Nathan</h4>
                            <h5>Project Manager</h5>
                        </div>
                        <div className="col-md-3">
                            <img className="profilePhoto" src={chrisProfileImg}/>
                            <h4>Chris Synnott</h4>
                            <h5>Software Development Lead/UI Specialist</h5>
                        </div>
                        <div className="col-md-3">
                            <img className="profilePhoto" src={yeProfileImg}/>
                            <h4>Ye Lin</h4>
                            <h5>Database Specialist</h5>
                        </div>
                        <div className="col-md-3">
                            <img className="profilePhoto" src={mahibProfileImg}/>
                            <h4>Mahib Hosain</h4>
                            <h5>Software Architect</h5>
                        </div>
                    </div>

                    <div className="row text-center pt45">
                        <div className="col-md-3">
                            <img className="profilePhoto" src={kevinProfileImg}/>
                            <h4>Kevin Nguyen</h4>
                            <h5>Software Development Lead</h5>
                        </div>
                        <div className="col-md-3">
                            <img className="profilePhoto" src={shaneProfileImg}/>
                            <h4>Shane Nielsen</h4>
                            <h5>Software Development Lead</h5>
                        </div>
                        <div className="col-md-3">
                            <img className="profilePhoto" src={andrewProfileImg}/>
                            <h4>Andrew Sylvester</h4>
                            <h5>Senior System Analyst</h5>
                        </div>
                        <div className="col-md-3">
                            <img className="profilePhoto" src={jasonProfileImg}/>
                            <h4>Jason Kuo</h4>
                            <h5>Algorithm Specialist</h5>
                        </div>
                    </div>

                    <div className="row text-center pt45">
                        <div className="col-md-3">
                            <img className="profilePhoto" src={moProfileImg}/>
                            <h4>Mo Rahman</h4>
                            <h5>Business Analyst</h5>
                        </div>
                        <div className="col-md-3">
                            <img className="profilePhoto" src={ericProfileImg}/>
                            <h4>Eric Ping</h4>
                            <h5>Quality Assurance Lead</h5>
                        </div>
                        <div className="col-md-3">
                            <img className="profilePhoto" src={garyProfileImg}/>
                            <h4>Gary Gillespie</h4>
                            <h5>Professor</h5>
                        </div>

                    </div>

                </div>

                <div className="b-space pt65"></div>

                <div className="container">
                    <div className="row pt65 ptm85 text-center">
                        <div className="col-md-12">
                            <h2>Built with <span className="heartLogo"><i className="fas fa-heart"></i></span></h2>
                            <p className="pt20">For the Spring 2018 quarter with Gary Gillespie, CSE HUB is a software engineering project for
                                CSE110 built with the following technologies/frameworks: </p>

                        </div>
                    </div>

                    <div className="row pt20 text-center">
                        <div className="col-md-12">
                            <img className="w100" src={techLogosImg}/>
                        </div>
                    </div>
                </div>


            </main>

            <footer className="container mt65">
                <p className="text-center">&copy; CSE HUB 2018</p>
            </footer>


                <div className="modal fade" id="modal-youtubeTutorial" tabIndex="-1" role="dialog"
                     aria-labelledby="youtubeTutorialModal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">

                            <div className="modal-body">
                                <iframe className="w100" width="560" height="315" src="https://www.youtube.com/embed/WhrsY3CfpBI"
                                        frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>

                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </Router>

    );
};
