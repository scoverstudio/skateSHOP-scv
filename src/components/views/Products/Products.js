import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-alice-carousel/lib/alice-carousel.css";

import { getAllProducts } from "../../../redux/productsRedux";
import styles from "./Products.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Products.css";
import Button from "../../common/Button/Button";
import { addProduct } from "../../../redux/cartRedux";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => getAllProducts(state));

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

  const handleProductAdd = (product) => {
    dispatch(addProduct(product));
  };

  return (
    <section className={styles.root}>
      <h3>
        Some of our <span>decks</span>
      </h3>
      <Slider className={styles.products} {...settings}>
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
                <div className={styles.control}>
                  <Button
                    onClickAction={handleProductAdd}
                    product={product}
                    text="Add to cart"
                  />
                  <Button text="Details" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Products;
