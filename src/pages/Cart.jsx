import classes from "./Cart.module.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SwishSpinner } from "react-spinners-kit";
import axios from "axios";

const orderClient = axios.create({
  baseURL:
    "https://xqai7ofhql.execute-api.us-west-2.amazonaws.com/prod/postcheckout/%7BcustomerId%7D",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

function Cart(props) {
  const navigate = useNavigate();
  const input = useRef();
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  const [isLoading, setIsLoading] = useState(false);
  let customer = JSON.parse(localStorage.getItem("customer"));


  function modItem(item, value) {
    console.log(item);
    console.log(value);

    let cart = JSON.parse(localStorage.getItem("cart"));
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name === item.name) {
        cart[i].quantity += parseInt(value, 10);
        if (cart[i].quantity === -1) {
          return null;
        }
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart);
  }

  function removeItem(item) {
    let oldCart = JSON.parse(localStorage.getItem("cart"));
    let newCart = JSON.parse("[]");
    for (let i = 0; i < oldCart.length; i++) {
      if (oldCart[i].name !== item.name) {
        newCart.push(oldCart[i]);
      }
    }
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  }

  function buildOrder() {
    console.log(cart);
    let customer = JSON.parse(localStorage.getItem("customer"));
    let id = customer.customerId;
    let order = {
      customerId: id,
      cart: [],
    };

    for (let i = 0; i < cart.length; i++) {
      order.cart.push(cart[i]);
    }

    console.log(order);
    console.log(JSON.stringify(order));
    checkout(order);
  }

  function checkout(order) {
    setIsLoading(true);
    let customer = JSON.parse(localStorage.getItem("customer"));
    orderClient
      .post(
        `https://xqai7ofhql.execute-api.us-west-2.amazonaws.com/prod/postcheckout/` +
          customer.customerId,
        JSON.stringify(order)
      )
      .then((res) => {
        console.log(res);
        if (res.data.orderModel == null) {
          setIsLoading(false);
          return alert(res.data.responseStatus.message);
        }
        sessionStorage.setItem("order", JSON.stringify(res.data.orderModel));
        console.log(res.data);
        setIsLoading(false);
        localStorage.removeItem("cart");
        return navigate("/checkout");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  let discount = customer != null ? 1 * 0.9 : 1;

  return (
    <div>
      {cart == null || cart.length === 0 ? (
        <h1>GO BUY SOMETHING!!!</h1>
      ) : (
        <div className={classes.page}>
          <div className={classes.product_container}>
            <table className={classes.product_table}>
              <thead>
                <tr className={classes.navThread}>
                  <th scope="col">Item</th>
                  <th scope="col">Details</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Item Price</th>
                  <th scope="col">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => (
                  <tr key={product.name}>
                    <td>
                      <img
                        className={classes.table_img}
                        src={product.imageUrl}
                        alt="pic goes here"
                      />
                    </td>
                    <td>{product.description}</td>
                    <td className={classes.quantityData}>
                      <div className={classes.top}>
                        <input
                          type="number"
                          name="quantity"
                          min="0"
                          ref={input}
                          value={product.quantity}
                          readOnly={true}
                        />
                        <button
                          className={classes.incdec}
                          onClick={() => modItem(product, -1)}
                        >
                          -
                        </button>
                        <button
                          className={classes.incdec}
                          onClick={() => modItem(product, 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className={classes.rem_btn}
                        onClick={() => removeItem(product)}
                      >
                        Remove
                      </button>
                    </td>
                    <td>${product.priceInCents / 100}</td>
                    <td>${(product.quantity * product.priceInCents) / 100}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={classes.bot_data}>
            {isLoading ? (
              <div className={classes.icon}>
                <SwishSpinner />
              </div>
            ) : null}
            {!isLoading ? (
              <div className={classes.order_data}>
                <p>
                  Total: $
                  {cart.reduce(
                    (total, item) => total + item.priceInCents * item.quantity,
                    0
                  ) / 100}
                  {customer != null ? (
                    <p>
                      Customer Discount: 10% <br />
                      New Total: $
                      {cart.reduce(
                        (total, item) =>
                          total + item.priceInCents * item.quantity * discount,
                        0
                      ) / 100}
                    </p>
                  ) : null}
                </p>
                <button onClick={buildOrder}>Submit Order</button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
export default Cart;
