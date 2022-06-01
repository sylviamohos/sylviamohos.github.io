import classes from "./Account.module.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { SwishSpinner } from "react-spinners-kit";


const customerClient = axios.create({
    baseURL: 'https://xqai7ofhql.execute-api.us-west-2.amazonaws.com/prod/customer/',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});


function Account() {
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
    


  
    function updateCustomer() {
        setIsLoading(true)
        let customer = JSON.parse(localStorage.getItem("customer"))
        let id = customer.customerId
        let jsonFile = {
            customerId: id,
            email: email,
            name: name,
            address: address,
            city: city,
            state: state,
            zipcode: zipcode,
            password: password, 
        };

        Object.entries(customer).map(([key, value]) => {
            console.log(value)
            if(value == "") {
                alert("Values cannot be blank")
            }
        })
        customerClient.put('https://xqai7ofhql.execute-api.us-west-2.amazonaws.com/prod/customer/'+ id,
        JSON.stringify(jsonFile)).then(res => {
          console.log(res.data)
          setIsLoading(false)
        })
        .catch(err => {
          console.log(err)
          setIsLoading(false)
          alert("Something went wrong, try again")
        })

      }
    
    return (
        <>
      <div className={classes.card}>
        <h1 className={classes.login}>Update My Info</h1>
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
            onClick={updateCustomer}
          >
            Update
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


export default Account;