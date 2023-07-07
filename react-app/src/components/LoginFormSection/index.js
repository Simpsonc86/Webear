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
      <h1 class="header">Log in to Webear</h1>
      <form class="formclass" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label class="email">
          <p class="formtext">Email</p>
          <input
            class="loginInputs"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label class="password">
          <p class="formtext">Password</p>
          <input
            class="loginInputs"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button class="submit" type="submit">
          Log In
        </button>
        <Link className='demo-link' onClick={loginDemoUser}>Demo user</Link>
      </form>
      <div class="botCont">
        <p class="signup">Don't have an account yet?</p>
        <button onClick={() => history.push("/signup")}>
          Signup
        </button>
      </div>
    </>
  );
}

export default LoginFormSection;
