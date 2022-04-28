import React from "react";
import Products from "../Products/Products";
import styles from "./Homepage.module.scss";

const Homepage = () => {
  return (
    <div className={styles.root}>
      <section className={styles.header}>
        <div className={styles.banner}>
          <h2 className={styles.bannerText}>
            Welcome to <span>Vintage</span> SkateSHOP!
          </h2>
        </div>
      </section>
      <Products />
    </div>
  );
};

export default Homepage;
