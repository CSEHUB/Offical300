import React, {Component} from 'react';
import {Dashboard} from './Dashboard';
import firebase from 'firebase';
import 'firebase/database';
import './index.css';
import gradesourceLogo from './res/images/GradeSource_logo.png'
import piazzaLogo from './res/images/Piazza_logo.png'
import autograderLogo from './res/images/Autograder_Logo.png'
import gradescopeLogo from './res/images/Gradescope_logo.png'
import podcastLogo from './res/images/podcast.png'
import celesteLogo from './res/images/celeste.png'
import picoLogo from './res/images/picoracer.png'
import flappyBeeLogo from './res/images/flappyBee.png'
import pacmanLogo from './res/images/Pacman_logo.png'
import defaultWidget from './res/images/defaultWidget.png'
import pdfLogo from './res/images/pdfLogo.png'
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';

var courseName;
var widgetNum = 0;
var wid;
var website;
var urls;
var widgetAdd;
var uid;
var dropDown;
var module = require('./courses');
var courses = module.courses;
var secretGS = 0;


function uploadWidget() {
    var path = `workspaces/` + wid + '/widgets';
    var widget = {
        id:0,
        courseType:website,
        url:urls,
        secretNum:secretGS
    }
    widgetAdd = false; //Finish add widget process.
    return firebase.database().ref(path).push(widget).getKey();
}

class Widget extends Component {
    constructor(name) {
        super();
        courseName = name;
        this.state = {
            urls: new Array(),
            website: new Array(),
            widgetID: new Array(),
            uid: new Array(),
            secretNum: new Array(),
            gsGrade: new Array(),
            gsRank: new Array(),
            gsURL: new Array()
        }

        this.makeWidget = this.makeWidget.bind(this);

        //Gets wid and calls appropriate function asynchronously
        // for adding or getting widget. In this case it will get widgets.
        widgetAdd = false;
        this.getWid();
    }

    //Function to remove a widget from firebase, and website.
    rmWidget(param) {
        firebase.auth().onAuthStateChanged( user => {
            if (user) {
                var uid = this.state.uid[param]; //Get the widget id

                //Got to path of widget. Under workspace id
                var path = `workspaces/` + wid + '/widgets';
                const ref = firebase.database().ref(path);

                //Delete child at widget id
                ref.child(uid).remove();

                //Re render widgets on deletion  of widget.
                this.setState(prevState => {
                    let newUrls = prevState.urls.slice();
                    let newWebsite = prevState.website.slice();
                    let newWidgetID = prevState.widgetID.slice();
                    let newUid = prevState.uid.slice();
                    let newSecretNum = prevState.secretNum.slice();
                    let gsGrade = prevState.gsGrade.slice();
                    let gsRank = prevState.gsRank.slice();
                    let gsURL = prevState.gsURL.slice();

                    newUrls.splice(param, 1);
                    newWebsite.splice(param, 1);
                    newWidgetID.splice(param, 1);
                    newUid.splice(param, 1);
                    console.log(newUrls);
                    newSecretNum.splice(param, 1);
                    gsGrade.splice(param, 1);
                    gsRank.splice(param, 1);
                    gsURL.splice(param, 1);
                    return {
                        urls: newUrls,
                        website: newWebsite,
                        widgetID: newWidgetID,
                        uid: newUid,
                        secretNum: newSecretNum,
                        gsRank: gsRank,
                        gsURL: gsURL,
                        gsGrade: gsGrade
                    }
                });
            }
        });
    }

    //Get workspace ID and call upload widget or download widgets
    getWid() {
        //Lets prep firebase for update.
        firebase.auth().onAuthStateChanged( user => {
            if (user!=null&&courseName!="") {
                console.log(courseName);
                var path = `users/${user.uid}/workspace/` + courseName;
                const userCoursenameReference = firebase.database().ref(path);

                //Lets grab the uid to go to the location to store the widget under /workspaces
                userCoursenameReference.once('value').then((snapshot) => {
                    //Get id (key) of workspace from course name
                    const val = snapshot.val(); //To stay constant outside once function. Will lose data if this is gone.
                    wid = val;

                    if(wid !== null) {
                        if(Boolean(widgetAdd)) {
                            var x = uploadWidget();
                            this.setState({ uid: this.state.uid.concat(x) });
                            }
                        else {
                            this.getWidgets(); //Must call outside function to finish widget render because of asynchronous.
                        }
                    }
                });

            }
        });
    }

    async getGradeSourceInfo(param, index) {
        var grade;
        var rank;

        //Get rank and grade
        await firebase.database().ref(param).once('value').then(function (snapshot) {
           try {
               grade = "Overall Grade: " + snapshot.val().Grade;
               rank = "Rank: " + snapshot.val().Rank;

               //Fixes formatting by removing spaces inbetween data in string
               grade = grade.split('．').join('.');
           }
           catch(error) {
               console.error(error);
           }
        });

        //Update widget with values
        var array = this.state.gsGrade;
        array[index] = grade;
        this.setState({gsGrade: array});

        //Update widget with values
        array = this.state.gsRank;
        array[index] = rank;
        this.setState({gsRank: array});
    }

    async getGradeSourceURL(param, index) {
        var webURL;

        //Get gradesource url
        await firebase.database().ref(param).once('value').then(function (snapshot) {
            webURL = snapshot.val();
        });

        if(webURL){
            //Format url by removing spaces
            webURL = webURL.split('．').join('.');
            webURL = webURL.split('／').join('/');
        }
        //Update widget with values
        var array = this.state.gsURL;
        array[index] = webURL;
        this.setState({gsURL: array});

    }

    getWidgets() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                var path = `workspaces/` + wid + '/widgets';
                const getWidgets = firebase.database().ref(path);

                getWidgets.once('value').then((snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                        website = childSnapshot.val().courseType;
                        urls = childSnapshot.val().url;
                        secretGS = childSnapshot.val().secretNum;
                        uid = childSnapshot.key;

                        var index = this.state.website.length;

                        //Get grade and rank
                        var db = "/GradeSource/" + urls + "/" + secretGS;

                        if (website == "Visual") {
                            //Get grades and rank
                            this.getGradeSourceInfo(db, index);

                            //Get course url from database:
                            var db = "/GradeSource/" + urls + "/URL";

                            this.getGradeSourceURL(db, index);

                        }

                        //Update local widgets.
                        this.setState({website: this.state.website.concat(website)});
                        this.setState({urls: this.state.urls.concat(urls)});
                        this.setState({widgetID: this.state.widgetID.concat(widgetNum)});
                        this.setState({uid: this.state.uid.concat(uid)});
                        this.setState({secretNum: this.state.secretNum.concat(secretGS)});

                        if (website !== "Visual") {
                            //Update with phony vals since not used
                            this.setState({gsGrade: this.state.gsGrade.concat(0)});
                            this.setState({gsRank: this.state.gsRank.concat(0)});
                            this.setState({gsURL: this.state.gsURL.concat(".")});
                        }

                        //Increase ID num for nexr widget. (for iframe display)
                        widgetNum++;

                    })
                }, function(error) {
                    // The callback failed.
                    console.error(error);
                });
            }

        })
    }

    websiteWidget() {
        //What type of course website are we adding?
        var courseType;

        var webURL = document.getElementById("webURL").value;

        //must keep and store orig URL since we can't load all lowercase in iframes
        var origURL = webURL;
        //Make sure url is lowercase for comparisons
        webURL = webURL.toLowerCase();

        //Assign coursetype
        if (webURL.indexOf('gradesource') !== -1) {
            courseType = "GradeSource";
        }

        else if (webURL.indexOf('gradescope') !== -1) {
            courseType = "GradeScope";
        }

        else if (webURL.indexOf('autograder') !== -1) {
            courseType = "AutoGrader";
        }
        else if (webURL.indexOf('piazza') !== -1) {
            courseType = "Piazza";
        }
        else if (webURL.indexOf('podcast') !== -1) {
            courseType = "Podcast";
        }
        else if(origURL.indexOf('.pdf') != -1){
            courseType = "pdf";
            origURL = origURL + "#zoom=100";
        }
        else {
            courseType = "Other";
        }


        //Check if "http://" is at begin if not add it
        if (origURL.indexOf('http') != 0) {
            origURL = 'http://' + origURL;
        }

        //clear input text box if user tries to quickly add another widget
        //removes previous widget url
        document.getElementById("webURL").value = "";

        //Update local widgets.
        this.setState({ website: this.state.website.concat(courseType) });
        this.setState({ urls: this.state.urls.concat(origURL) });
        this.setState({ gsURL: this.state.gsURL.concat(origURL) });
        this.setState({ widgetID: this.state.widgetID.concat(widgetNum) });
        this.setState({ secretNum: this.state.secretNum.concat(0) });
        this.setState({ gsGrade: this.state.gsGrade.concat(0) });
        this.setState({ gsRank: this.state.gsRank.concat(0) });

        //Update variables to be pushed.
        website = courseType;
        urls = origURL;

        //Increment widget count for unique ID for modal popup identifier.
        widgetNum++;

        //Lets prep firebase for update and then update.
        this.getWid();
    }

    GradeSource() {
        var webURL;
        secretGS = document.getElementById("secretNum").value;
        var course = document.getElementById("gsCourseName").value;

        /*
        Hope to add this when same origin is worked around.

        Make sure url is lowercase for comparisons
        webURL = webURL.toLowerCase();

        //Check if "http://" is at begin if not add it
        if (webURL.indexOf('http') != 0) {
            webURL = 'http://' + webURL;
        }

        Make URL http://www.sourcegrade.xyz/grades?id=4562&url=http://www.gradesource.com/reports/7/29889/index.html
        var sourceGrade = "http://www.sourcegrade.xyz/grades?id=" + secretGS + "&url=" + webURL;
        */

        var index = this.state.website.length;

        //Get grade and rank
        var db = "/GradeSource/" + course + "/" + secretGS;
        this.getGradeSourceInfo(db, index);


        //Get course url from database:
        db = "/GradeSource/" + course + "/URL";

        this.getGradeSourceURL(db, index);

        //Update local widgets.
        this.setState({ website: this.state.website.concat("Visual") });
        this.setState({ urls: this.state.urls.concat(course) }); //Can get url from course
        this.setState({ widgetID: this.state.widgetID.concat(widgetNum) });
        this.setState({ secretNum: this.state.secretNum.concat(secretGS) });

        //Update variables to be pushed.
        website = "Visual";
        urls = course;

        //Increment widget count for unique ID for modal popup identifier.
        widgetNum++;

        //Lets prep firebase for update and then update.
        this.getWid();
    }

    Game() {
        //Update local widgets.
        this.setState({ website: this.state.website.concat(dropDown) });
        this.setState({ urls: this.state.urls.concat(dropDown) });
        this.setState({ widgetID: this.state.widgetID.concat(widgetNum) });
        this.setState({ secretNum: this.state.secretNum.concat(0) });

        //Update variables to be pushed.
        website = dropDown;
        urls = dropDown;

        //Increment widget count for unique ID for modal popup identifier.
        widgetNum++;

        //Lets prep firebase for update and then update.
        this.getWid();
    }

    //Prep the widget for creation, and then create it.
    makeWidget() {
        var widgetType = document.getElementById("widgetType").value;

        //Currently adding widget. Used in getwid()
        widgetAdd = true;

        //Is this a standard website widget?
        if(widgetType === "Website") {
            //Add a website widget type.
            this.websiteWidget();
        }
        else if(widgetType === "Visual") {
            this.GradeSource();
        }
        else if(widgetType === "Game") {
            dropDown = document.getElementById("Game").value;
            this.Game();
        }
    }

    //Function to dynamoically change required fields depending on the widget type.
    static dragDownForm(event){
        dropDown = event.target.value;
        var x = document.getElementById("innerForm");

        //Clear existing html
        x.innerHTML = "";

        if(event.target.value === "Website") {
            x.innerHTML = "<div class=\"form-group\">\n" +
                "            <label htmlFor=\"exampleFormControlInput1\">URL: </label>\n" +
                "            <input id=\"webURL\" type=\"text\" class=\"form-control\"\n" +
                "                   placeholder=\"\"/>\n" +
                "        </div>"
        }
        else if(event.target.value === "Visual"){
            var options = "";
            courses.map((course, index) => {
                     options += "<option id=\"gsCourse\" value=\"" + course + "\">" + course + "</option>"
            })
            x.innerHTML = "<div id=\"innerForm\">\n" +
                "      <div class=\"form-group\">\n" +
                "      <label htmlFor=\"exampleFormControlInput1\\\">GradeSource URL: </label>\n" +
                "      <select class=\"form-control\" id=\"gsCourseName\" value={this.state.value}>\n" +
                options +
                "      </select>\n" +                "     " +
                "<br/>" +
                " <label htmlFor=\"exampleFormControlInput1\">Secret Number: </label>\n" +
                "      <input id=\"secretNum\" type=\"text\" class=\"form-control\" placeholder=\"4320\"/>\n" +
                "     </div>\n" +
                "     </div>"
        }
        else if(event.target.value === "Game"){
            x.innerHTML = "<div class=\"form-group\">\n" +
                "         <label htmlFor=\"exampleFormControlSelect1\">Choose Game: </label>\n" +
                "         <select class=\"form-control\" id=\"Game\" value={this.state.value}>\n" +
                "         <option value=\"Celeste\">Celeste</option>\n" +
                "         <option value=\"Pico-Racer\">Pico-Racer</option>\n" +
                "         <option value=\"pacman\">Pacman</option>\n" +
                "         <option value=\"Bee\">Flappy Flock: Collect The Birds</option>\n" +
                "         </select>\n" +
                "          </div>"
        }
    }


    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="floatRight">
                    <li className="addWidget" data-toggle="modal" data-target="#modal-addWidget">Add
                        Widget
                    </li>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* Load/render widgets you see on screen initially */}
                    {/* Modals (see below this) and widgets are connected via id's */}
                    {/* I imported a library for easy if/if-else/then etc.. tags */}
                    {this.state.urls.map((url, arrayIndex) => {
                        return (
                            <If condition={this.state.website[arrayIndex] == 'GradeSource'}>

                                {/* If Gradesource, show logo only */}
                                <Then>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 w-container-out">
                                        <div className="w-top">
                                            <div onClick={this.rmWidget.bind(this, arrayIndex)} className="w-top-l"><i className="far fa-times-circle"></i></div>
                                            <div className="w-top-r"><a href={this.state.gsURL[arrayIndex]} target="_blank"><i className="fas fa-window-restore"></i></a></div>
                                        </div>
                                        <div id="e" draggable="true" className="w-container" data-toggle="modal"
                                             data-target={'#' + this.state.widgetID[arrayIndex]}>
                                            <img className="widgetLogo" src={gradesourceLogo}/>
                                        </div>
                                    </div>
                                </Then>

                                {/* If Gradesource Visualizer, display scraped data from secret number */}
                                <ElseIf condition={this.state.website[arrayIndex] == 'Visual'}>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 w-container-out">
                                        <div className="w-top">
                                            <div onClick={this.rmWidget.bind(this, arrayIndex)} className="w-top-l"><i className="far fa-times-circle"></i></div>
                                            <div className="w-top-r"><a href={this.state.gsURL[arrayIndex]} target="_blank"><i className="fas fa-window-restore"></i></a></div>
                                        </div>
                                        <div id="e" draggable="true" className="w-container" data-toggle="modal"
                                             data-target={'#' + this.state.widgetID[arrayIndex]}>
                                            <img className="widgetLogo" src={gradesourceLogo}/>
                                            <br/>
                                            <center>{this.state.gsGrade[arrayIndex]}</center>
                                            <center>{this.state.gsRank[arrayIndex]}</center>
                                        </div>
                                    </div>
                                </ElseIf>


                                {/* If Piazza, just show logo */}
                                <ElseIf condition={this.state.website[arrayIndex] == 'Piazza'}>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 w-container-out">
                                        <div className="w-top">
                                            <div onClick={this.rmWidget.bind(this, arrayIndex)} className="w-top-l"><i className="far fa-times-circle"></i></div>
                                            <div className="w-top-r"><a href={this.state.urls[arrayIndex]} target="_blank"><i className="fas fa-window-restore"></i></a></div>
                                        </div>
                                        <div id="e" draggable="true" className="w-container" data-toggle="modal"
                                             data-target={'#' + this.state.widgetID[arrayIndex]}>
                                            <img className="widgetLogo" src={piazzaLogo}/>
                                        </div>
                                    </div>

                                </ElseIf>

                                {/* If Gradescope, just show logo */}
                                <ElseIf condition={this.state.website[arrayIndex] == 'GradeScope'}>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 w-container-out">
                                        <div className="w-top">
                                            <div onClick={this.rmWidget.bind(this, arrayIndex)} className="w-top-l"><i className="far fa-times-circle"></i></div>
                                            <div className="w-top-r"><a href={this.state.urls[arrayIndex]} target="_blank"><i className="fas fa-window-restore"></i></a></div>
                                        </div>
                                        <div id="e" draggable="true" className="w-container" data-toggle="modal"
                                             data-target={'#' + this.state.widgetID[arrayIndex]}>
                                            <img className="widgetLogo" src={gradescopeLogo}/>
                                        </div>
                                    </div>
                                </ElseIf>


                                {/* If Autograder, just show logo */}
                                <ElseIf condition={this.state.website[arrayIndex] == 'AutoGrader'}>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12  w-container-out">
                                        <div className="w-top">
                                            <div onClick={this.rmWidget.bind(this, arrayIndex)} className="w-top-l"><i className="far fa-times-circle"></i></div>
                                            <div className="w-top-r"><a href={this.state.urls[arrayIndex]} target="_blank"><i className="fas fa-window-restore"></i></a></div>
                                        </div>
                                        <div id="e" draggable="true" className="w-container" data-toggle="modal"
                                             data-target={'#' + this.state.widgetID[arrayIndex]}>
                                            <img className="widgetLogo" src={autograderLogo}/>
                                        </div>
                                    </div>
                                </ElseIf>

                                {/* If Podcast, just show logo */}
                                <ElseIf condition={this.state.website[arrayIndex] == 'Podcast'}>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 w-container-out">
                                        <div className="w-top">
                                            <div onClick={this.rmWidget.bind(this, arrayIndex)} className="w-top-l"><i className="far fa-times-circle"></i></div>
                                            <div className="w-top-r"><a href={this.state.urls[arrayIndex]} target="_blank"><i className="fas fa-window-restore"></i></a></div>
                                        </div>
                                        <div id="e" draggable="true" className="w-container" data-toggle="modal"
                                             data-target={'#' + this.state.widgetID[arrayIndex]}>
                                            <img className="widgetLogo podcast-logo" src={podcastLogo}/>
                                        </div>
                                    </div>
                                </ElseIf>

                                {/* If PDF */}
                                <ElseIf condition={this.state.website[arrayIndex] == 'pdf'}>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12  w-container-out">
                                        <div className="w-top">
                                            <div onClick={this.rmWidget.bind(this, arrayIndex)} className="w-top-l"><i className="far fa-times-circle"></i></div>
                                            <div className="w-top-r"><a href={this.state.urls[arrayIndex]} target="_blank"><i className="fas fa-window-restore"></i></a></div>
                                        </div>
                                        <div id="e" draggable="true" className="w-container" data-toggle="modal"
                                             data-target={'#' + this.state.widgetID[arrayIndex]}>
                                            <img className="widgetLogo pdfLogo" src={pdfLogo}/>
                                        </div>
                                    </div>

                                </ElseIf>

                                {/* If Other website, just show CSEHUB default */}
                                <ElseIf condition={this.state.website[arrayIndex] == 'Other'}>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12  w-container-out">
                                        <div className="w-top">
                                            <div onClick={this.rmWidget.bind(this, arrayIndex)} className="w-top-l"><i className="far fa-times-circle"></i></div>
                                            <div className="w-top-r"><a href={this.state.urls[arrayIndex]} target="_blank"><i className="fas fa-window-restore"></i></a></div>
                                        </div>
                                        <div id="e" draggable="true" className="w-container" data-toggle="modal"
                                             data-target={'#' + this.state.widgetID[arrayIndex]}>
                                            <img className="widgetLogo defaultWidget" src={defaultWidget}/>
                                            <br/>
                                        </div>
                                    </div>

                                </ElseIf>


                                {/* If Celeste */}
                                <ElseIf condition={this.state.website[arrayIndex] == 'Celeste'}>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12  w-container-out">
                                        <div className="w-top">
                                            <div onClick={this.rmWidget.bind(this, arrayIndex)} className="w-top-l"><i className="far fa-times-circle"></i></div>
                                            <div className="w-top-r"><a href={this.state.urls[arrayIndex]} target="_blank"><i className="fas fa-window-restore"></i></a></div>
                                        </div>
                                        <div id="e" draggable="true" className="w-container" data-toggle="modal"
                                             data-target={'#' + this.state.widgetID[arrayIndex]}>
                                            <img className="widgetLogoCeleste" src={celesteLogo}/>
                                        </div>
                                    </div>

                                </ElseIf>

                                {/* If Pico-Racer */}
                                <ElseIf condition={this.state.website[arrayIndex] == 'Pico-Racer'}>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12  w-container-out">
                                        <div className="w-top">
                                            <div onClick={this.rmWidget.bind(this, arrayIndex)} className="w-top-l"><i className="far fa-times-circle"></i></div>
                                            <div className="w-top-r"><a href={this.state.urls[arrayIndex]} target="_blank"><i className="fas fa-window-restore"></i></a></div>
                                        </div>
                                        <div id="e" draggable="true" className="w-container" data-toggle="modal"
                                             data-target={'#' + this.state.widgetID[arrayIndex]}>
                                            <img className="widgetLogoPico" src={picoLogo}/>
                                        </div>
                                    </div>

                                </ElseIf>

                                {/* If flappyBee */}
                                <ElseIf condition={this.state.website[arrayIndex] == 'Bee'}>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12  w-container-out">
                                        <div className="w-top">
                                            <div onClick={this.rmWidget.bind(this, arrayIndex)} className="w-top-l"><i className="far fa-times-circle"></i></div>
                                            <div className="w-top-r"><a href={this.state.urls[arrayIndex]} target="_blank"><i className="fas fa-window-restore"></i></a></div>
                                        </div>
                                        <div id="e" draggable="true" className="w-container" data-toggle="modal"
                                             data-target={'#' + this.state.widgetID[arrayIndex]}>
                                            <img className="widgetLogoPico" src={flappyBeeLogo}/>
                                        </div>
                                    </div>

                                </ElseIf>

                                {/* If pacman */}
                                <ElseIf condition={this.state.website[arrayIndex] == 'pacman'}>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12  w-container-out">
                                        <div className="w-top">
                                            <div onClick={this.rmWidget.bind(this, arrayIndex)} className="w-top-l"><i className="far fa-times-circle"></i></div>
                                            <div className="w-top-r"><a href={this.state.urls[arrayIndex]} target="_blank"><i className="fas fa-window-restore"></i></a></div>
                                        </div>
                                        <div id="e" draggable="true" className="w-container" data-toggle="modal"
                                             data-target={'#' + this.state.widgetID[arrayIndex]}>
                                            <img className="widgetLogo" src={pacmanLogo}/>
                                        </div>
                                    </div>

                                </ElseIf>

                            </If>


                        )
                    })}
                </div>


                {/* Load widget modals at the bottom of screen with pre-loaded iframes. Initially set to display:'none' until user clicks on widget */}
                {/* Modals and widgets are connected via id's */}
                {this.state.urls.map((url, Index) => {
                    return (
                        <div key={Index} className="modal fade" id={this.state.widgetID[Index]} tabIndex="-1" role="dialog"
                             aria-labelledby={this.state.widgetID[Index]}  aria-hidden="true">

                            <If>
                                            <Then condition={this.state.website[Index] == 'Celeste'}>
                                                <div className="modal-dialog widget-modalCeleste modal-dialog-centered" role="document">
                                                    <div className="modal-content widget-modal-h">
                                                        <div className="modal-body widget-modal-h">
                                                <iframe sandbox="allow-scripts" scrolling="no" src="http://v6p9d9t4.ssl.hwcdn.net/html/235259/Celeste/index.html" style={{border: '0px none', marginLeft: '0px', height: 565, marginTop: 0, width: 570}}>
                                                    <p>Your browser does not support iframes.</p>
                                                        </iframe>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Then>

                                            <ElseIf condition={this.state.website[Index] == 'Visual'}>
                                                <div className="modal-dialog widget-modal modal-dialog-centered" role="document">
                                                    <div className="modal-content widget-modal-h">
                                                        <div className="modal-body widget-modal-h">
                                                            <iframe className="modal-full" src={this.state.gsURL[Index]}
                                                                    frameBorder="0" allow="autoplay; encrypted-media"></iframe>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ElseIf>

                                            <ElseIf condition={this.state.website[Index] == 'Pico-Racer'}>
                                                <div className="modal-dialog widget-modalCeleste modal-dialog-centered" role="document">
                                                    <div className="modal-content widget-modal-h">
                                                        <div className="modal-body widget-modal-h">
                                                <iframe sandbox="allow-scripts" scrolling="no" src="http://v6p9d9t4.ssl.hwcdn.net/html/394002/picoracer/index.html" style={{border: '0px none', marginLeft: 0, height: 650, marginTop: 0, width: 575}}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ElseIf>

                                            <ElseIf condition={this.state.website[Index] == 'Bee'}>
                                                <div className="modal-dialog widget-modalCeleste modal-dialog-centered" role="document">
                                                    <div className="modal-content widget-modal-h">
                                                        <div className="modal-body widget-modal-h">
                                                            <iframe sandbox="allow-scripts" scrolling="no" src="http://v6p9d9t4.ssl.hwcdn.net/html/524861/index.html" allowFullScreen style={{border: '0px none', marginLeft: 0, height: 650, marginTop: 0, width: 575}}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                            </ElseIf>

                                            <ElseIf condition={this.state.website[Index] == 'pacman'}>
                                                <div className="modal-dialog widget-modalCeleste modal-dialog-centered" role="document">
                                                    <div className="modal-content widget-modal-h">
                                                        <div className="modal-body widget-modal-h">
                                                            <iframe className="modal-full pacman-iframe" frameBorder="0" allow="encrypted-media" src="https://macek.github.io/google_pacman/"></iframe>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ElseIf>


                                            <Else>
                                                <div className="modal-dialog widget-modal modal-dialog-centered">
                                                    <div className="modal-content widget-modal-h">
                                                        <div className="modal-body widget-modal-h">
                                                <iframe className="modal-full" src={this.state.urls[Index]}
                                                        frameBorder="0" allow="autoplay; encrypted-media"></iframe>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Else>
                                        </If>
                        </div>
                    )
                })}




                {/* -------------- Add Workspace Modal ------------- */}
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
                                <button onClick={Dashboard.makeWorkspace} type="button" className="btn btn-primary" data-dismiss="modal">Save Workspace</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ------------- Add Widget Modal -------------- */}
                <div className="modal fade" id="modal-addWidget" tabIndex="-1" role="dialog"
                     aria-labelledby="AddWebsite" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">New Widget:</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <form>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlSelect1">Choose Widget: </label>
                                        <select className="form-control" id="widgetType" onChange={Widget.dragDownForm} value={this.state.value}>
                                            <option value="Website">Website (Piazza, GradeScope, Autograder, etc)</option>
                                            <option value="Visual">GradeSource Visualizer</option>
                                            <option value="Game">PICO-8 Game</option>
                                        </select>
                                    </div>

                                    <form>
                                        <div id="innerForm">
                                            <div className="form-group">
                                                <label htmlFor="exampleFormControlInput1">URL: </label>
                                                <input id="webURL" type="text" class="form-control"/>
                                            </div>
                                        </div>
                                    </form>

                                </form>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel
                                </button>
                                <button onClick={this.makeWidget} type="button" className="btn btn-primary" data-dismiss="modal">Add Widget</button>
                            </div>
                        </div>
                    </div>
                </div>



            </div>

        );
    }
}

export default Widget;