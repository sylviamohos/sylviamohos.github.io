import classes from "./SignUpModal.module.css";
import { useState } from "react";
import { ReactDOM } from "react";

const portal = document.getElementById("portal");

function SignUpModal({ open }) {
    if (!open) {
      return null;
    }

  function submitHandler() {
      console.log("submit");
      //Implement API call to create a new customer
    open = false;
  }

  function cancelHandler() {
    open = false;
  }
  return (
    <>
      {/* <div className={classes.overlay}></div> */}
      <div className={classes.main}>
        <form className={classes.login_box}>
          <div className={classes.top}>
            <h1>Sign Up</h1>
            <input
              className={classes.input}
              type="text"
              placeholder="Full Name"
              id="name"
            />
            <input
              className={classes.input}
              type="text"
              placeholder="Email"
              id="email"
            />
            <input
              className={classes.input}
              type="password"
              placeholder="Password"
              id="password"
            />
            <input
              className={classes.input}
              type="text"
              placeholder="Address"
              id="address"
            />
            <input
              className={classes.input}
              type="text"
              placeholder="City"
              id="city"
            />
            <input
              className={classes.input}
              type="text"
              placeholder="State"
              id="state"
            />
            <input
              className={classes.input}
              type="text"
              placeholder="ZipCode"
              id="zipCode"
            />
          </div>
          <div className={classes.bot}>
            <button className={classes.btn} onClick={submitHandler}>
              Submit
            </button>
            <button className={classes.btn} onClick={cancelHandler}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUpModal;
