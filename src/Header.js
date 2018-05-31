import './App.css'
import Widget from './Widget.js';
import logo from './res/images/Logo.png'
import googlePhoto from './res/images/testGooglePhoto.jpeg'
import React from 'react';

export const Header = () => {
    return (

<div className="row">
                {/* Logo portion of Nav, to match sidebar */}
                <div className="col-lg-2 order-lg-1 col-md-2 order-md-1 order-sm-1 order-1 col-5">
                    <div className="mr-auto form-inline topNavLogoSearchContainer">
                        <a className="App-logo" href="/"><img id="Logo" src={logo}/></a>
                    </div>
                </div>
                {/* Nav - Everything to right of logo */}

                        <div className="col-lg-6 order-lg-2 col-md-6 order-md-2 order-sm-3 order-3 col-12">
                        <div className="form-inline topNavLogoSearchContainer">
                        <form className="form-inline my-2 my-lg-0 topNavSearch">
                            <input className="form-control mr-sm-2 topNavInput" type="search" placeholder="Search"
                               aria-label="Search"/>
                            <button className="btn-header btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        </div>
                        </div>


                        <div className="col-lg-4 order-lg-3 col-md-4 order-md-3 order-sm-2 order-2 col-7">
                        <div className="addWorkspace ml-auto" data-toggle="modal" data-target="#modal-addWidget">ADD WIDGET</div>
                        <div className="floatRight form-inline googleDiv">
                            <div className="googleName order-md-1 order-2"></div>
                            <div className="googlePhotoWrapper order-md-2 order-1"><img class="googlePhoto" src={googlePhoto}/></div>
                        </div>

            </div>
</div>

    );
};

export const Widget1 = (props) => {
    return (new Widget(props.name));
}
