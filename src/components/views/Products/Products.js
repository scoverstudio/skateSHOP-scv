import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-alice-carousel/lib/alice-carousel.css";
import PropTypes from "prop-types";

import styles from "./Products.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Products.css";
import Button from "../../common/Button/Button";
import { getAllProductsInCart } from "../../../redux/cartRedux";
import { Link } from "react-router-dom";
import { handleProductAdd } from "../../../helpers/handleProductAdd";
import clsx from "clsx";
import { fetchProducts } from "../../../redux/productsRedux";

const Products = ({ title, style }) => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(setProducts));
  }, [dispatch]);

  const cartProducts = useSelector((state) => getAllProductsInCart(state));

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },

      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <section className={styles.root}>
      <h3>{title}</h3>
      <Slider className={styles.products} {...settings}>
        {products.map((product, index) => (
          <div key={index} className={styles.productContainer}>
            <div className={clsx(styles.imageContainer)}>
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
                <div className={styles.control}>
                  <Button
                    onClick={() =>
                      handleProductAdd(product, cartProducts, dispatch)
                    }
                    text="Add to cart"
                  />
                  <Link to={`/products/${product.producer}/${product._id}`}>
                    <Button text="Details" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

Products.propTypes = {
  products: PropTypes.array,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: PropTypes.string,
};
export default Products;
