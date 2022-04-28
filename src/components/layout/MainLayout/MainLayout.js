import React from "react";
import PropTypes from "prop-types";
import styles from "./MainLayout.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const MainLayout = ({ children }) => {
  return (
    <div className={styles.root}>
      <nav className={styles.navigation}>
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
                </Link>
              </li>
            </ul>
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
