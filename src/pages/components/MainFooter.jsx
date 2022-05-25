import { Link } from "react-router-dom";
import classes from "./MainFooter.module.css";
import "./resources/Logo-small.png";
import { useRef } from "react";

function MainFooter() {
  return (
    <footer className={classes.footer}>
      <div className={classes.top}>
        <ul>
          <li>
            <a className={classes.link} href="https://www.twitter.com/">
              Twitter
            </a>
          </li>
          <li>
            <a className={classes.link} href="https://www.facebook.com/">
              Facebook
            </a>
          </li>
          <li>
            <a className={classes.link} href="https://www.google.com/">
              Google+
            </a>
          </li>
          <li>
            <a className={classes.link} href="https://www.instagram.com/">
              Instagram
            </a>
          </li>
        </ul>
      </div>
      <div className={classes.bottom}>
        <div className={classes.left}>
          <ul>
            <li>
              <a className={classes.link} href="#">
                Contact
              </a>
            </li>
            <li>
              <a className={classes.link} href="#">
                About Us
              </a>
            </li>
            <li>
              <a className={classes.link} href="#">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>
        <div className={classes.right}>
          <ul>
            <li>
              <a className={classes.link} href="#">
                Careers
              </a>
            </li>
            <li>
              <a className={classes.link} href="#">
                Change Country
              </a>
            </li>
            <li>
              <a className={classes.link} href="#">
                FAQ
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );

  // <footer>
  //   <div class="top">
  //     <ul>
  //       <li>
  //         <a href="#">Twitter</a>
  //       </li>
  //       <li>
  //         <a href="#">Facebook</a>
  //       </li>
  //       <li>
  //         <a href="#">Google+</a>
  //       </li>
  //       <li>
  //         <a href="#">Instagram</a>
  //       </li>
  //     </ul>
  //   </div>
  //   <div class="bottom">
  //     <div class="left">
  //       <ul>
  //         <li>
  //           <a href="#">Contact</a>
  //         </li>
  //         <li>
  //           <a href="#">About Us</a>
  //         </li>
  //         <li>
  //           <a href="#">Terms & Conditions</a>
  //         </li>
  //       </ul>
  //     </div>
  //     <div class="right">
  //       <ul>
  //         <li>
  //           <a href="#">Careers</a>
  //         </li>
  //         <li>
  //           <a href="#">Change country</a>
  //         </li>
  //         <li>
  //           <a href="#">FAQ</a>
  //         </li>
  //       </ul>
  //     </div>
  //   </div>
  // </footer>;
}

export default MainFooter;
