import React from "react";
import { useSelector } from "react-redux";
import { getAllProductsInCart } from "../../../redux/cartRedux";
import Button from "../../common/Button/Button";
import styles from "./Cart.module.scss";

const Cart = () => {
  const cartProducts = useSelector(getAllProductsInCart);

  return (
    <div className={styles.root}>
      <h2 className={styles.cartTitle}>Your cart</h2>
      <div className={styles.cartContainer}>
        {cartProducts.map((cartProduct) => (
          <div className={styles.cartProduct} key={cartProduct.id}>
            <div className={styles.productImage}>
              <img
                alt={cartProduct.name}
                className={styles.image}
                src={`${process.env.PUBLIC_URL}/images/${cartProduct.id}.jpg`}
              />
            </div>
            <div className={styles.productContent}>
              <h3 className={styles.productName}>{cartProduct.name}</h3>
              <span>Delivery time: 1-5 days</span>
              <div className={styles.productInfo}>
                <p>Color: {cartProduct.colour}</p>
                <p>Producer: {cartProduct.producer}</p>
                <p>Gender: {cartProduct.gender}</p>
                <p>Size: {cartProduct.size}</p>
              </div>
            </div>
            <div className={styles.productControl}>
              <div className={styles.quantity}>
                <Button className={styles.button1} text="+" />

                <div className={styles.number}>
                  <input></input>
                </div>
                <Button className={styles.button2} variant="outline" text="-" />
              </div>
              <div className={styles.price}>{cartProduct.price} $</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
