import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { handleProductAdd } from "../../../helpers/handleProductAdd";
import { getAllProductsInCart } from "../../../redux/cartRedux";
import {
  fetchProductById,
  fetchProductByProducer,
} from "../../../redux/productsRedux";
import Button from "../../common/Button/Button";
import Products from "../Products/Products";
import styles from "./Product.module.scss";

const Product = () => {
  const { id, producer } = useParams();
  const [product, setProduct] = useState();
  const [productsByProducer, setProductsByProducer] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const cartProducts = useSelector((state) => getAllProductsInCart(state));

  useEffect(() => {
    dispatch(fetchProductById(id, producer, setProduct, setIsLoading));
    dispatch(fetchProductByProducer(producer, setProductsByProducer));
  }, [dispatch, id, producer]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    product && (
      <div className={styles.root}>
        <div className={styles.singleProduct}>
          <div className={styles.firstPanel}>
            <img
              alt={product.name}
              className={styles.image}
              src={`${process.env.PUBLIC_URL}/images/${product.id}.jpg`}
            />
          </div>
          <div className={styles.secondPanel}>
            <div className={styles.contentContainer}>
              <h3 className={styles.titleName}>{product.name}</h3>
              <p className={styles.price}>$ {product.price}</p>
              <div className={styles.details}>
                <h3>Details</h3>
                <p>Producer: {product.producer}</p>
                <p>Category: {product.category}</p>
                <p>Size: {product.size}</p>
                <p>Color: {product.color}</p>
                <p>Gender: {product.gender}</p>
              </div>
              <div className={styles.control}>
                <Button
                  onClick={() =>
                    handleProductAdd(product, cartProducts, dispatch)
                  }
                  style={styles.addToCart}
                  text="Add to cart"
                />
              </div>
            </div>
          </div>
        </div>
        <Products
          style={styles.productsByProducer}
          products={productsByProducer}
          title="Check out other products"
        />
      </div>
    )
  );
};

export default Product;
