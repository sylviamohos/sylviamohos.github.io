import classes from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { SwishSpinner } from "react-spinners-kit";

const customerClient = axios.create({
  baseURL: `https://xqai7ofhql.execute-api.us-west-2.amazonaws.com/prod/customer`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

function Signup() {
  const navigate = useNavigate();
  let nameInput = useRef();
  let emailInput = useRef();
  let passwordInput = useRef();
  let addressInput = useRef();
  let cityInput = useRef();
  let stateInput = useRef();
  let zipcodeInput = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [isLoading, setIsLoading] = useState(false);



  function createCustomer() {
    setIsLoading(true)
    let customer = {
      email: email,
      name: name,
      address: address,
      city: city,
      state: state,
      zipcode: zipcode,
      password: password,
    };
    
    customerClient
      .post(
        `https://xqai7ofhql.execute-api.us-west-2.amazonaws.com/prod/customer`,
        JSON.stringify(customer)
      )
      .then((res) => {
        console.log(res);
        if (res.data.customerModel == null) {
          setIsLoading(false);
          return alert(res.data.responseStatus.message);
        }
        localStorage.setItem(
          "customer",
          JSON.stringify(res.data.customerModel)
        );
        console.log(res.data);
        setIsLoading(false);
        return navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className={classes.card}>
        <h1 className={classes.login}>Sign up!</h1>
        <label className={classes.label}>Name</label>
        <input
          type="text"
          placeholder="Name"
          ref={nameInput}
          onChange={() => setName(nameInput.current.value)}
        />
        <label className={classes.label}>Email</label>
        <input
          type="email"
          placeholder="Email"
          ref={emailInput}
          onChange={() => setEmail(emailInput.current.value)}
        />
        <label className={classes.label}>Password</label>
        <input
          type="password"
          placeholder="Password"
          ref={passwordInput}
          onChange={() => setPassword(passwordInput.current.value)}
        />
        <label className={classes.label}>Address</label>
        <input
          type="text"
          placeholder="Address"
          ref={addressInput}
          onChange={() => setAddress(addressInput.current.value)}
        />
        <label className={classes.label}>City</label>
        <input
          type="text"
          placeholder="City"
          ref={cityInput}
          onChange={() => setCity(cityInput.current.value)}
        />
        <label className={classes.label}>State</label>
        <input
          type="text"
          placeholder="State"
          ref={stateInput}
          onChange={() => setState(stateInput.current.value)}
        />
        <label className={classes.label}>Zip Code</label>
        <input
          type="text"
          placeholder="Zip Code"
          ref={zipcodeInput}
          onChange={() => setZipcode(zipcodeInput.current.value)}
        />
        <SwishSpinner loading={isLoading} />
        <div className={classes.btn}>
          <button
            disabled={isLoading}
            className={classes.signin}
            onClick={createCustomer}
          >
            Create
          </button>

          <Link to="/">
            <button disabled={isLoading} className={classes.cancel}>
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
export default Signup;
