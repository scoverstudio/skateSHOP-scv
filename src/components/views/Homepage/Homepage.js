import {
  faPhoneVolume,
  faThumbsUp,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "../../common/Button/Button";
import Products from "../Products/Products";
import styles from "./Homepage.module.scss";

const Homepage = () => {
  return (
    <div className={styles.root}>
      {/* <div className={styles.header}>
        <div className={styles.banner}>
          <h2 className={styles.bannerText}>
            Welcome to <span>Vintage</span> SkateSHOP!
          </h2>
        </div>
      </div> */}
      <div className={styles.headerContainer}>
        <div className={styles.headerPanels}>
          <div className={styles.contentContainer}>
            <h2 className={styles.headerText}>
              <span>
                The
                <br />
                perfect
                <br />
                moment
              </span>
              <br />
              to start skating!
            </h2>
            {/* <p>Dont waste your time and order now.</p> */}
            <div className={styles.control}>
              <Button style={styles.buttonLeft} text="Order now" />
              <Button style={styles.buttonRight} text="Check more" />
            </div>
          </div>
          <div className={styles.imageContainer}>
            <img
              alt="skaterboy"
              className={styles.skaterImage}
              src={`${process.env.PUBLIC_URL}/images/skaterboy.png`}
            />
          </div>
        </div>
      </div>
      <Products
        style={styles.homeProducts}
        title={
          <p>
            Some of our <span>decks</span>
          </p>
        }
      />
      <section className={styles.aboutUs}>
        <h3>What you can expect</h3>
        <div className={styles.panels}>
          <div className={styles.panel}>
            <FontAwesomeIcon className={styles.icon} icon={faThumbsUp} />
            <h4>High quality</h4>
            <p>We guarantee the highest quality of our products.</p>
          </div>
          <div className={styles.panel}>
            <FontAwesomeIcon className={styles.icon} icon={faPhoneVolume} />
            <h4>Constant contact</h4>
            <p>We are answering 24/7 on your messages and problems.</p>
          </div>
          <div className={styles.panel}>
            <FontAwesomeIcon className={styles.icon} icon={faTruckFast} />
            <h4>Free delivery</h4>
            <p>If your costs are higher than 150$ delivery is fully free.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
