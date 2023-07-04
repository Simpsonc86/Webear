import React from "react";
import LoginInfoSection from "../components/LoginInfoSection";
import LoginFormSection from "../components/LoginFormSection";
import './login.css';
    export default function Login(){
        return(
            <>
            <div class = "bigcont">
                <div class = "left">
                <LoginInfoSection></LoginInfoSection>
                </div>
                <div class = "right">
                <LoginFormSection></LoginFormSection>
                </div>
                </div></>
        )
}
