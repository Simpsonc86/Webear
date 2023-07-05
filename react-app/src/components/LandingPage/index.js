import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
import './LandingPage.css';

export default function LandingPage({ isLoaded }) {
    return (
        <>
            <div className='outer-div-container'>
                <video autoPlay muted loop className="landing-page-video" src="landingPageVid.mp4" >
                </video>
                <div className='floating-text-box'>
                    <div className='floating-text-title'>Enjoy Tech. Enjoy investing</div>
                    <div className="floating-text">
                        <p className="float">0 Commissions and no deposit minimums.</p>
                        <p className="float">Everyone gets smart tools for smart investing.</p>
                    </div>

                    <NavLink className="get-started" to="/signup">Get Started</NavLink>
                </div>
                <div className='footer'>
                    <p>Disclaimer: This is not a real financial website with real-time stock prices and purchases!</p>
                    
                    <NavLink className="group-link" to="/signup">Contributor Github Link</NavLink>
                    <NavLink className="group-link" to="/signup">Contributor Github Link</NavLink>
                    <NavLink className="group-link" to="/signup">Contributor Github Link</NavLink>
                    <NavLink className="group-link" to="/signup">Contributor Github Link</NavLink>
                </div>

            </div>
        </>
    )
}