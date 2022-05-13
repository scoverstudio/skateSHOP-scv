import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../../redux/productsRedux";
import Products from "../Products/Products";
import styles from "./Homepage.module.scss";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(setProducts));
  }, []);

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
        products={products}
        style={styles.homeProducts}
        title={
          <p>
            Some of our <span>decks</span>
          </p>
        }
      />
    </div>
  );
};

export default Homepage;
