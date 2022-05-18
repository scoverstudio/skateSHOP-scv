import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./MainLayout.module.scss";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartFromLocalStorage,
  getAllProductsInCart,
  getCount,
} from "../../../redux/cartRedux";

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const productsInCart = useSelector(getCount);
  const cartProducts = useSelector(getAllProductsInCart);

  useEffect(() => {
    dispatch(fetchCartFromLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    cartProducts &&
      localStorage.setItem(
        "cartProducts",
        JSON.stringify(cartProducts) || "[]"
      );
  }, [cartProducts, dispatch]);

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
                <Link to="/cart">Free delivery from 150$</Link>
              </div>
              <div className={styles.return}>
                <Link to="/cart">returns and complaints</Link>
              </div>
            </div>
          </div>
          <div className={styles.navContent}>
            <Link to="/">
              <h1 className={styles.logo}>SkateSHOP</h1>
            </Link>
            <div className={styles.routes}>
              <ul>
                <li>
                  <NavLink to="/">
                    <FontAwesomeIcon className={styles.Icon} icon={faHeart} />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/cart">
                    <FontAwesomeIcon
                      className={styles.Icon}
                      icon={faCartShopping}
                    />
                    <span className={styles.cartValue}>{productsInCart}</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {children}
      <footer>
        <p>SkateShop COPYRIGHT &copy;</p>
        <div className={styles.left}></div>
        <div className={styles.right}></div>
        <div className={styles.skater}></div>
      </footer>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
