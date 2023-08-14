import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import validator from 'validator';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState([]);
  const [dob, setDOB] = useState("");

  let history = useHistory();

  if (sessionUser) return <Redirect to="/dashboard" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorArr = [];
    if (password !== confirmPassword) {

      errorArr.push("Confirm Password field must be the same as the Password field");
    }
    //TODO put validation
    if(!validator.isEmail(email)){
      errorArr.push("Must enter valid email");
    }
    if((dob.substring(0, 5).substring(0, 4)>'2005' || dob.substring(0,5).substring(0, 4) === '2005') && dob.substring(5, 7) > '07'){
      errorArr.push("Must be 18 or older")
    }
    if(!errorArr.length){
      await dispatch(signUp(username, email, password, firstName, lastName, dob));
    }
    else{
      setErrors(errorArr)
    }
   };

  return (
    <>
      <h1 className="signupHeader">Sign Up</h1>
      <form className="signupFormClass" onSubmit={handleSubmit}>
       { errors.length>0 && <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>}
        <label className = "signupFirst">
          First Name
          <input type="text"
          className = "signupInput"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required />
        </label>
        <label className = "signupLast">
          Last Name
          <input type="text"
          className = "signupInput"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required />
        </label>
        <label className = "signupDOB">
          Date of Birth
          <input type="date"
          value={dob}
          onChange={(e) => setDOB(e.target.value)}
          required
          />
        </label>
        <label className="signupEmail">
          Email
          <input
          className = "signupInput"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="signupUsername">
          Username
          <input
          className = "signupInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="signupPassword">
          Password
          <input
          className = "signupInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className="signupConfirmPassword">
          Confirm Password
          <input
          className = "signupInput"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button className = "submit" type="submit">Sign Up</button>
        <div className="sigupdiv">Already have an account?</div>
        <button  className="demo-link signup-bottom" onClick={() => history.push("/login")}>Login</button>
      </form>
      {/* <div className="signupBotCont">
      </div> */}
    </>
  );
}

export default SignupFormPage;
