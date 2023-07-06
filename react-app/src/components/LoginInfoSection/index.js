import React from "react";
import './LoginInfoSection.css';
import { useHistory } from "react-router-dom";
export default function LoginInfoSection(){
    let history = useHistory();
    return(
        <div class = "cont">
            <div className="navLogo">
            <img onClick={()=> history.push('/')} className="webear-logo"src="/webearLogo.png" alt="webear-logo" />
            <h3 onClick={()=> history.push('/')} class = "title">Webear</h3>
            </div>
            <div className="text">
            <h2 className = "bigText">Invest in Stocks ETFs, and Options</h2>
            <p className ="join">Join Webear today and start investing with 0 commission*</p>
            <p className = "fees">*Relevant regulatory and exchange fees may apply.</p>
            <img className = "loginImage" src="https://images.livemint.com/img/2023/02/10/600x338/Stock_market_news_1675988415033_1675988415210_1675988415210.jpg" alt="" />
            </div>
        </div>
    )
}
