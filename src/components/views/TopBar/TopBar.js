import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./TopBar.module.scss";

const TopBar = () => {
  const [showTopBar, setShowTopBar] = useState(true);

  const controlNavbar = () => {
    if (window.scrollY > 31) {
      setShowTopBar(false);
    } else {
      setShowTopBar(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  return (
    <div
      className={clsx(styles.topBarContainer, showTopBar && styles.showTopBar)}
    >
      <div className={styles.topBarContent}>
        <div className={styles.info}>
          <Link to="/help">help</Link>
          <Link to="/contact">contact</Link>
          <Link to="/about">about us</Link>
        </div>
        <div className={styles.freeDelivery}>
          <Link to="/cart">Free delivery from 150$</Link>
        </div>
        <div className={styles.return}>
          <Link to="/cart">returns and complaints</Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
