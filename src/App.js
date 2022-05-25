import { Route, Routes } from "react-router-dom";
import axios from "axios";
import classes from "./App.module.css";

import Home from "./pages/Home";
import MainNavigation from "./pages/components/MainNavigation";
import MainFooter from "./pages/components/MainFooter";
import LoginModal from "./pages/components/LoginModal";
import SignUpModal from "./pages/components/SignUpModal";
import ApiHandler from "./ApiHandler"
import React, { useEffect, useState } from "react";

const productClient = axios.create({
  baseURL: `https://xqai7ofhql.execute-api.us-west-2.amazonaws.com/prod/products`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const customerClient = axios.create({
  baseURL: `https://xqai7ofhql.execute-api.us-west-2.amazonaws.com/prod/customeremail/`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});


function App(props) {
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [signUpIsOpen, setSignUpIsOpen] = useState(false);
  const [content, setContent] = useState([]);
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState([])


  function search(criteria) {
    productClient
      .get(criteria)
      .then((res) => {
        setContent(res.data.products);
        console.log(res.data);
        console.log(criteria);
      })
      .catch((err) => {
        console.log(err);
        console.log(criteria);
      });
  }

  function searchCustomer(email, password) {
customerClient
  .get(email + "?password=" + password)
  .then((res) => {
    setUser(res.data.customerModel);
    console.log(res.data);
    console.log(email + "?password=" + password);
  })
  .catch((err) => {
    console.log(err);
    console.log(email + "?password=" + password);
  });
  }

  return (
    <div className={classes.main}>
      <MainNavigation
        className={classes.nav}
        openLoginModal={() => setLoginIsOpen(true)}
        openSignUpModal={() => setSignUpIsOpen(true)}
        loginOpen={loginIsOpen}
        signupOpen={signUpIsOpen}
        content={search}
      />
      <LoginModal open={loginIsOpen} />
      <SignUpModal open={signUpIsOpen} login={searchCustomer}/>
      <Routes>
        <Route path="/" element={<Home data={content} content={search}/>} />
      </Routes>
      <MainFooter className={classes.footer} />
    </div>
  );
}

export default App;
