import React from "react";
import Products from "../Products/Products";
import styles from "./Homepage.module.scss";

const Homepage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.banner}>
          <h2 className={styles.bannerText}>
            Welcome to <span>Vintage</span> SkateSHOP!
          </h2>
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
            <h4>High quality</h4>
            <p>We guarantee the highest quality of our products.</p>
          </div>
          <div className={styles.panel}>
            <h4>Constant contact</h4>
            <p>We are answering 24/7 on your messages and problems.</p>
          </div>
          <div className={styles.panel}>
            <h4>Free delivery</h4>
            <p>If your costs are higher than 150$ delivery is fully free.</p>
          </div>
        </div>
      </section>
      {/* <section className={styles.splineSkate}>
        <iframe
          src="https://my.spline.design/emojiskatecopy-c482c98884ca32397927301ee18db38c/"
          frameBorder="0"
          width="100%"
          height="100%"
          title="skate"
        ></iframe>
      </section> */}
    </div>
  );
};

export default Homepage;
