import { faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearCart,
  decrement,
  getAllProductsInCart,
  increment,
  removeProduct,
} from "../../../redux/cartRedux";
import Button from "../../common/Button/Button";
import styles from "./Cart.module.scss";

const Cart = () => {
  const cartProducts = useSelector(getAllProductsInCart);
  const dispatch = useDispatch();

  const handleProductRemove = (id) => {
    dispatch(removeProduct(id));
  };

  const clearProductsFromCart = () => {
    dispatch(clearCart([]));
  };

  const incrementQuantity = (id, quantity) => {
    if (quantity < 10 && quantity >= 1) {
      dispatch(increment(id));
    }
  };

  const decrementQuantity = (id, quantity) => {
    if (quantity > 1 && quantity <= 10) {
      dispatch(decrement(id));
    }
  };

  return (
    <div className={styles.root}>
      <h2 className={styles.cartTitle}>Your cart</h2>
      <div className={styles.container}>
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
                <span className={styles.orderDeliveryTime}>
                  Delivery time: 1-5 days
                </span>
                <div className={styles.productInfo}>
                  <p>Color: {cartProduct.color}</p>
                  <p>Producer: {cartProduct.producer}</p>
                  <p>Gender: {cartProduct.gender}</p>
                  <p>Size: {cartProduct.size}</p>
                </div>
                <div className={styles.productActions}>
                  <div
                    onClick={() => handleProductRemove(cartProduct.id)}
                    className={styles.productRemove}
                  >
                    <FontAwesomeIcon
                      className={styles.icon}
                      icon={faTrashCan}
                    />
                    <h4>Remove product</h4>
                  </div>
                  <div className={styles.productFavorite}>
                    <FontAwesomeIcon className={styles.icon} icon={faHeart} />
                    <h4>Favorite product</h4>
                  </div>
                </div>
              </div>
              <div className={styles.productControl}>
                <div className={styles.quantity}>
                  <Button
                    className={styles.button1}
                    text="+"
                    onClick={() =>
                      incrementQuantity(cartProduct.id, cartProduct.quantity)
                    }
                  />
                  <div className={styles.number}>
                    <input
                      type="number"
                      maxLength="10"
                      minLength="0"
                      readOnly
                      value={cartProduct.quantity}
                    />
                  </div>
                  <Button
                    className={styles.button2}
                    variant="outline"
                    text="-"
                    onClick={() =>
                      decrementQuantity(cartProduct.id, cartProduct.quantity)
                    }
                  />
                </div>
                <div className={styles.price}>
                  {cartProduct.price * cartProduct.quantity} $
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.summary}>
          <h3 style={{ color: "black" }}>Cart totals</h3>
          <div className={styles.subtotal}>
            <h5>Subtotal</h5>
            <p>$ 0</p>
          </div>
          <div className={styles.total}>
            <h5>Total</h5>
            <p>$ 20</p>
          </div>
          <Button
            onClick={() => clearProductsFromCart()}
            style={styles.checkout}
            text="PROCCED TO CHECKOUT"
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;