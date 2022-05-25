import classes from "./LoginModal.module.css";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ReactDOM } from "react";
import axios from "axios";
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";
import Home from "../Home";

const portal = document.getElementById("portal");

function LoginModal(props) {
  const emailInput = useRef();
  const passwordInput = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!props.open) {
    return null;
  }

  function submitHandler() {
    console.log("submit");
    props.login(email, password);
    props.open = false;
  }

  function cancelHandler() {
    props.open = false;
  }

  function saveToLocalStorage(customerId) {
    window.localStorage.setItem("customerId", customerId);
  }
  return (
    <>
      {/* <div className={classes.overlay}></div> */}
      <div className={classes.main}>
        <form className={classes.login_box}>
          <div className={classes.top}>
            <h1>Log In</h1>
            <label>Email</label>
            <input
              className={classes.input}
              type="text"
              placeholder="Email Address"
              ref={emailInput}
              onChange={() => setEmail(emailInput.current.value)}
            />
            <label>Password</label>
            <input
              className={classes.input}
              type="password"
              placeholder="Password"
              ref={passwordInput}
              onChange={() => setPassword(passwordInput.current.value)}
            />
          </div>
          <div className={classes.mid}>
            <input type="checkbox" />
            <p>Remember Me</p>
          </div>
          <div className={classes.bot}>
            <button className={classes.btn} onClick={submitHandler}>Submit
              <Link to={Home}></Link>
            </button>

            <button className={classes.btn} onClick={cancelHandler}>Cancel
              <Link to={Home}></Link>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginModal;
