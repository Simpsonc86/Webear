import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, Link } from "react-router-dom";
import "./LoginForm.css";
function LoginFormSection() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  let history = useHistory();
  if (sessionUser) return <Redirect to="/dashboard" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(sessionActions.login(email, password));
    // console.log(data)
    if (data) {
      setErrors(data);
    }
  };

  const loginDemoUser = async (e) => {
    e.preventDefault()
    const email = "demo@aa.io"
    const password = "demopassword"
    const data = await dispatch(sessionActions.login(email, password));
    if (data) {
      setErrors(data);
    } else {
      history.push("/dashboard")
    }
  }

  return (
    <>
      <h1 className="login-header">Log in to Webear</h1>
      <form className="formclass" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="email">
          <p className="formtext">Email</p>
          <input
            className="loginInputs"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="password">
          <p className="formtext">Password</p>
          <input
            className="loginInputs"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="submit" type="submit">
          Log In
        </button>
        <Link className='demo-link' onClick={loginDemoUser}>Demo user</Link>
        <div className="signupdiv">Don't have an account yet?</div>
        <button className="demo-link" onClick={() => history.push("/signup")}>
          Signup
        </button>
      </form>
      {/* <div className="botCont">
      </div> */}
    </>
  );
}

export default LoginFormSection;
