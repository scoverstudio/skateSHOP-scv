import React from "react";
import { useSelector } from "react-redux";
import "react-alice-carousel/lib/alice-carousel.css";

import { getAllProducts } from "../../../redux/productsRedux";
import styles from "./Products.module.scss";

const Products = () => {
  const products = useSelector((state) => getAllProducts(state));

  return (
    <section className={styles.root}>
      <h3>
        Some of our <span>decks</span>
      </h3>
      <div className={styles.products}>
        {products.map((product, index) => (
          <div key={index} className={styles.productContainer}>
            <div className={styles.imageContainer}>
              <img
                alt={product.name}
                className={styles.image}
                src={`${process.env.PUBLIC_URL}/images/${product.id}.jpg`}
              />
              <div className={styles.content}>
                <h4 className={styles.productName}>{product.name}</h4>
                <p className={styles.price}>{product.price} $</p>
                {product.size && (
                  <div className={styles.boardSizeContainer}>
                    <p className={styles.boardSize}>{product.size}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
