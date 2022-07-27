/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./MainLayout.module.scss";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faSearch,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartFromLocalStorage,
  getAllProductsInCart,
  getCount,
} from "../../../redux/cartRedux";
import { getAllProducts } from "../../../redux/productsRedux";
import clsx from "clsx";
import TopBar from "../../views/TopBar/TopBar";
import { getAllCategories } from "../../../redux/categoriesRedux";
import { getAllCategoryNames } from "../../../redux/categoryNames";

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const productsInCart = useSelector(getCount);
  const cartProducts = useSelector(getAllProductsInCart);
  const products = useSelector(getAllProducts);
  const categoryNames = useSelector(getAllCategoryNames);
  const categories = useSelector(getAllCategories);

  const [filteredProducts, setFilteredProducts] = useState(null);
  const [activeInput, setActiveInput] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [categoriesActive, setCategoriesActive] = useState(false);

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
    <div className={styles.mainLayoutRoot}>
      <nav className={styles.navigation}>
        <div className={styles.navContainer}>
          <TopBar />
          <div className={styles.navContent}>
            <Link to="/">
              <h1 className={styles.logo}>SkateSHOP</h1>
            </Link>
            <div className={styles.categories}>
              <ul>
                <li
                  onClick={() =>
                    setCategoriesActive(
                      categoriesActive === true ? false : true
                    )
                  }
                >
                  <Link to="#">Categories</Link>
                </li>
                <li>
                  <Link to="#">News</Link>
                </li>
                <li>
                  <Link to="#">Brands</Link>
                </li>
                <li>
                  <Link to="#">Sales</Link>
                </li>
              </ul>
            </div>
            <div className={styles.routes}>
              <form className={styles.searchContainer}>
                <input
                  type="text"
                  onChange={(e) => searchProduct(e, e.target.value)}
                  onFocus={() => setShowInput(true)}
                  id="inputSearch"
                  value={inputValue}
                  className={clsx(showInput === true && styles.active)}
                />
                {showInput && (
                  <div
                    id="inputSearch"
                    className={clsx(
                      styles.searchedProducts,
                      showInput === true && "active"
                    )}
                  >
                    {filteredProducts && filteredProducts.length !== 0 ? (
                      filteredProducts.map((product, index) => (
                        <Link
                          to={`/products/${product.producer}/${product._id}`}
                          onClick={() => {
                            setShowInput(false);
                            setInputValue("");
                            setFilteredProducts(null);
                          }}
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
                {showInput && (
                  <FontAwesomeIcon
                    className={clsx(
                      styles.iconCross,
                      showInput === true && styles.active
                    )}
                    icon={faTimes}
                    onClick={() => {
                      setShowInput(false);
                      setInputValue("");
                      setFilteredProducts(null);
                    }}
                  />
                )}
              </form>
              <ul>
                <li>
                  <a href="/account" className={styles.login}>
                    <FontAwesomeIcon className={styles.Icon} icon={faUser} />
                  </a>
                </li>
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
          <div
            className={clsx(
              styles.categoriess,
              categoriesActive === true && styles.active
            )}
            onMouseOver={() => setCategoriesActive(true)}
            onMouseOut={() => setCategoriesActive(false)}
          >
            {categoryNames.map((categoryName) => (
              <div key={categoryName} className={styles.category}>
                <h3>{categoryName}</h3>
                <ul>
                  {categories.map((category) =>
                    category.id === categoryName
                      ? category.elements.map((element) => (
                          <li key={element}>
                            <Link
                              to={`/${categoryName}/${element}`}
                              onClick={() =>
                                setCategoriesActive(
                                  categoriesActive === false ? true : false
                                )
                              }
                            >
                              {element}
                            </Link>
                          </li>
                        ))
                      : null
                  )}
                </ul>
              </div>
            ))}
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
