import React from "react";
import Slider from "react-slick";
import styles from "./ProductSlider.module.scss";
import PropTypes from "prop-types";
// import "./ProductSlider.css";

const ProductSlider = ({ settings, items }) => {
  console.log(settings, items);
  return (
    <Slider {...settings}>
      {items.map((product, index) => (
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
    </Slider>
  );
};

ProductSlider.propTypes = {
  settings: PropTypes.object,
  items: PropTypes.array,
};

export default ProductSlider;
