import React from "react";
import PropTypes from "prop-types";
import styles from "./MainLayout.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { getCount } from "../../../redux/cartRedux";

const MainLayout = ({ children }) => {
  const productsInCart = useSelector(getCount);

  return (
    <div className={styles.root}>
      <nav className={styles.navigation}>
        <div className={styles.navContainer}>
          <div className={styles.topBarContainer}>
            <div className={styles.topBarContent}>
              <div className={styles.info}>
                <Link to="/help">help</Link>
                <Link to="/contact">contact</Link>
                <Link to="/about">about us</Link>
              </div>
              <div className={styles.freeDelivery}>
                <Link to="/cart">Free delivery from 50$</Link>
              </div>
              <div className={styles.return}>
                <Link to="/cart">returns and complaints</Link>
              </div>
            </div>
            <div className={styles.navContent}>
              <Link to="/">
                <h1 className={styles.logo}>SkateSHOP</h1>
              </Link>
              <div className={styles.routes}>
                <ul>
                  <li>
                    <Link to="/cart">
                      <FontAwesomeIcon
                        className={styles.cartIcon}
                        icon={faCartShopping}
                      />
                      <span className={styles.cartValue}>{productsInCart}</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {children}
      <footer>
        <p>SkateShop COPYRIGHT &copy;</p>
      </footer>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
