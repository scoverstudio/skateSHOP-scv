import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fetchProductById } from "../../../redux/productsRedux";
import styles from "./Product.module.scss";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();
  console.log(id, product);
  useEffect(() => {
    dispatch(fetchProductById(id, setProduct, setIsLoading));
  }, [dispatch, id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    product && (
      <div className={styles.root}>
        <div className={styles.imageContainer}>
          <img
            alt={product.name}
            className={styles.image}
            src={`${process.env.PUBLIC_URL}/images/${product.id}.jpg`}
          />
        </div>
        <div className={styles.contentContainer}>
          <h3>{product.name}</h3>
        </div>
      </div>
    )
  );
};

export default Product;
