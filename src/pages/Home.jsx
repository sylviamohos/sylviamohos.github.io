import classes from "./Home.module.css";


function Home(props) {


  const productsJsx = props.data.map((product) => (
    <div key={product.name} className={classes.item}>
      <div className={classes.img}>
        <img src={product.imageUrl} height="250" />
      </div>
      <h3 className={classes.name}>{product.name}</h3>
      <br />
      <div className={classes.desc}>{product.description}</div>
      <div className={classes.price}>${product.priceInCents / 100}</div>
    </div>
  ));
  return (
    <>
      <div className={classes.top_flex_container}>
        <div className={classes.top_flex_left}>
          <h1 className={classes.moto1}>Cool</h1>
          <h1 className={classes.moto2}>With</h1>
          <h1 className={classes.moto1}>Coule.</h1>
          <p>Bet you never felt this cool.</p>
          <p>Now you can, with CoolWithCoule!</p>
          <ul>
            <li>
              <button onClick={() => props.content("?name=apron")}>
                Aprons
              </button>
            </li>
            <li>
              <button onClick={() => props.content("?name=tea towel")}>
                Tea Towels
              </button>
            </li>
            <li>
              <button onClick={() => props.content("?name=oven mitt")}>
                Oven Mits
              </button>
            </li>
          </ul>
          <h1 className={classes.bottom_expression}>Get 'em while</h1>{" "}
          <h2>they're hot!</h2>
        </div>
        <div className={classes.top_flex_right}>
          <img
            src={require("./components/resources/Homepage-main.png")}
            alt="fail"
          />
        </div>
      </div>
      <div className={classes.content}>{productsJsx}</div>
    </>
  );
}

export default Home;
