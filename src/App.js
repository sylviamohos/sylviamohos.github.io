import { Route, Routes } from "react-router-dom";
import axios from "axios";
import classes from "./App.module.css";
import Checkout from "./pages/Checkout"
import Account from "./pages/Account";
import Home from "./pages/Home";
import MainNavigation from "./pages/components/MainNavigation";
import MainFooter from "./pages/components/MainFooter";
import Cart from "./pages/Cart";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import React, { useState } from "react";

const productClient = axios.create({
  baseURL: `https://xqai7ofhql.execute-api.us-west-2.amazonaws.com/prod/products`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});



const orderClient = axios.create({
  baseURL: 'https://xqai7ofhql.execute-api.us-west-2.amazonaws.com/prod/order/',
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

function App(props) {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  function search(criteria) {
    if (content.length > 0 && criteria == "ONLOAD") {
      return null
    }
    setIsLoading(true)
    productClient
      .get(criteria)
      .then((res) => {
        setContent(res.data.products);
        console.log(res.data);
        console.log(criteria);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        console.log(criteria);
        setIsLoading(false);
      });
  }

  

  // function searchOrder(orderId) {
  //   orderClient
  //   .get(orderId)
  //   .then((res) => {
  //     setOrder(res.data.order);
  //     console.log(res.data);
  //     console.log(orderId);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     console.log(orderId);
  //   });
  // }

  return (
    <div className={classes.main}>
      <MainNavigation className={classes.nav} content={search} />
      <Routes>
        <Route path="" element={<Home data={content} isLoading={isLoading} content={search} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/order" element ={<Checkout/>}/>
        <Route path="/account" element ={<Account/>}/>
      </Routes>
      <MainFooter className={classes.footer} />
    </div>
  );
}

export default App;
