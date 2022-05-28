import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./MainLayout.module.scss";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartFromLocalStorage,
  getAllProductsInCart,
  getCount,
} from "../../../redux/cartRedux";
import { getAllProducts } from "../../../redux/productsRedux";
import clsx from "clsx";
import e from "cors";

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const productsInCart = useSelector(getCount);
  const cartProducts = useSelector(getAllProductsInCart);
  const products = useSelector(getAllProducts);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [activeInput, setActiveInput] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

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

  const searchProduct = (e, input) => {
    e.preventDefault();
    setInputValue(input);

    if (input) {
      let filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().indexOf(input.toLowerCase()) !== -1
      );
      if (filteredProducts.length !== 0) {
        setActiveInput("active");
      } else {
        setActiveInput("none");
      }
      setFilteredProducts(filteredProducts);
    } else {
      setFilteredProducts(null);
      setActiveInput("none");
    }
  };

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
              <form className={styles.searchContainer}>
                <input
                  type="text"
                  onChange={(e) => searchProduct(e, e.target.value)}
                  onFocus={() => setShowInput(true)}
                  onBlur={() => {
                    setInputValue("");
                    setFilteredProducts([]);
                    setActiveInput("active");
                    setShowInput(false);
                  }}
                  value={inputValue}
                  className={clsx(showInput === true && "active")}
                />
                {showInput && (
                  <div
                    className={clsx(
                      styles.searchedProducts,
                      showInput === true && "active"
                    )}
                  >
                    {filteredProducts && filteredProducts.length !== 0 ? (
                      filteredProducts.map((product, index) => (
                        <Link
                          to={`/products/${product.producer}/${product._id}`}
                          key={index}
                          className={styles.searchedProduct}
                        >
                          <img
                            alt={product.name}
                            className={styles.image}
                            src={`${process.env.PUBLIC_URL}/images/${product.id}.jpg`}
                          />
                          <div className={styles.content}>
                            <h2>{product.name}</h2>
                            <p className={styles.price}>{product.price} $</p>
                          </div>
                        </Link>
                      ))
                    ) : filteredProducts && activeInput !== "active" ? (
                      <p className={styles.searchedProduct}>
                        We dont have this product
                      </p>
                    ) : null}
                  </div>
                )}
                <FontAwesomeIcon
                  className={clsx(
                    styles.icon,
                    showInput === true && styles.active
                  )}
                  icon={faSearch}
                  onClick={() => {
                    setShowInput(true);
                  }}
                />
              </form>
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
