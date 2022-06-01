import { useEffect, useState } from "react";
import classes from "./Home.module.css";
import { SwishSpinner } from "react-spinners-kit";

function Home(props) {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  useEffect(() => {
    props.content("ONLOAD");
  }, []);

  function saveToCart(product, index) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    let productExists = false;
    let cartIndex;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name === product.name) {
        console.log("cart: ", cart[i]);
        cart[i].quantity += 1;
        productExists = true;
        cartIndex = i;
        console.log("cart after: ", cart[i]);
      }
    }
    if (!productExists) {
      let item = {
        description: product.description,
        imageUrl: product.imageUrl,
        name: product.name,
        priceInCents: product.priceInCents,
        quantity: 1,
        type: product.type,
        upcCode: product.upcCode,
      };
      cart.push(item);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    product.quantity -= 1;

    let btn = document.getElementById(index);
    if (product.quantity <= 0) {
      btn.className = classes.outOfStock;
      btn.innerHTML = "OUT OF STOCK";
      btn.disabled = true;
    } else if (
      cartIndex != null &&
      cart[cartIndex].quantity >= product.quantity
    ) {
      btn.className = classes.outOfStock;
      btn.innerHTML = "OUT OF STOCK";
      btn.disabled = true;
    } else {
      btn.className = classes.btn;
    }

    console.log(props.data);
  }

  function checkStock(product, index) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    let btn = document.getElementById(index);

    for (let i = 0; i < cart.length; i++) {
      if (
        cart[i].name === product.name &&
        cart[i].quantity >= product.quantity
      ) {
        // btn.innerHTML = "OUT OF STOCK";
        // btn.disabled = true;
        // return classes.outOfStock;
      }
    }
    if (product.quantity <= 0) {
      btn.innerHTML = "OUT OF STOCK";
      btn.disabled = true;
      return classes.outOfStock;
    } else {
      return classes.btn;
    }
  }

  let productsJsx = props.data.map((product, index) => (
    <div key={product.name} className={classes.item}>
      <div className={classes.img}>
        <img src={product.imageUrl} alt={product.name} height="250" />
      </div>
      <h3 className={classes.name}>{product.name}</h3>
      <br />

      <div>
        <div className={classes.desc}>{product.description}</div>
        <div className={classes.price}>${product.priceInCents / 100}</div>
        <button
          id={index}
          className={checkStock(product, index)}
          onClick={() => saveToCart(product, index)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  ));

  return (
    <div className={classes.main}>
      <div className={classes.topContainer}>
        <div className={classes.imgContainer}>
          <div className={classes.imgContent}>
            <div className={classes.moto}>
              <h1 className={classes.moto1}>Cool</h1>
              <h1 className={classes.moto2}>With</h1>
              <h1 className={classes.moto1}>Coule.</h1>
            </div>
            <div className={classes.imgText}>
              <p>Bet you never felt this cool.</p>
              <p>Now you can, with CoolWithCoule!</p>
            </div>
          </div>
        </div>
      </div>
      <h1 className={classes.expression}>Get 'em while</h1>{" "}
      <h2>they're hot!</h2>
      <div className={classes.buttons}>
        <ul>
          <li>
            <button
              onClick={() => props.content("?name=apron")}
            >
              Aprons
            </button>
          </li>
          <li>
            <button
              onClick={() => props.content("?name=tea towel")}
            >
              Tea Towels
            </button>
          </li>
          <li>
            <button
              onClick={() => props.content("?name=oven mitt")}
            >
              Oven Mits
            </button>
          </li>
        </ul>
      </div>
      <div className={classes.content}>
        <SwishSpinner loading={props.isLoading} className={classes.icon} />
        {productsJsx.length === 0 && !props.isLoading ? (
          <h3>no results found.</h3>
        ) : (
          productsJsx
        )}
      </div>
    </div>
  );
}

export default Home;
