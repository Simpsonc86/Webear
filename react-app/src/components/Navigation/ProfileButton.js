import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    // const closeMenu = (e) => {
    //   if (!ulRef.current.contains(e.target)) {
    //     setShowMenu(false);
    //   }
    // };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/")
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
        {user ? (
          <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
            <p>Username: {user.username}</p>
            <p>Email:{user.email}</p>
            <p>
              <button className="logout-btn" onClick={handleLogout}>Log Out</button>
            </p>
          </ul>
          </>
        ) : (
          <>
            {/* <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            /> */}

            <div className="buttons">
              <button className="login-btn" onClick={() => history.push('/login')}>Login</button>
              <button className="signin-btn" onClick={() => history.push('/signup')}>Signup</button>
            </div>
          </>
        )}
    </>
  );
}

export default ProfileButton;

