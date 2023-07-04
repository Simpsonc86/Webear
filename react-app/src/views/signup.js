import React from "react";
import LoginInfoSection from "../components/LoginInfoSection";
import SignupFormPage from "../components/SignupFormPage";
import './signup.css';
    export default function Signup(){
        return(
            <>
            <div class = "bigcont">
                <div class = "left">
                <LoginInfoSection></LoginInfoSection>
                </div>
                <div class = "right">
                <SignupFormPage></SignupFormPage>
                </div>
                </div></>
        )
}
