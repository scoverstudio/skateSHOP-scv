import { faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addComment,
  decrement,
  getAllProductsInCart,
  getFreeDeliveryPrice,
  getSubtotalPrice,
  increment,
  removeProduct,
  totalPriceChange,
} from "../../../redux/cartRedux";
import Button from "../../common/Button/Button";
import styles from "./Cart.module.scss";

const Cart = () => {
  const [ifEmpty, setIfEmpty] = useState(false);
  const dispatch = useDispatch();
  const cartProducts = useSelector(getAllProductsInCart);
  const subtotal = useSelector(getSubtotalPrice);
  const freeDeliveryPrice = useSelector(getFreeDeliveryPrice);

  const handleProductRemove = (id) => {
    dispatch(removeProduct(id));
  };

  const incrementQuantity = (id, quantity) => {
    if (quantity < 10 && quantity >= 1) {
      dispatch(increment(id));
    }
    dispatch(totalPriceChange(id));
  };

  const decrementQuantity = (id, quantity) => {
    if (quantity > 1 && quantity <= 10) {
      dispatch(decrement(id));
    }
    dispatch(totalPriceChange(id));
  };

  const checkoutActions = (length) => {
    if (length === 0) {
      setIfEmpty(true);
    } else {
      setIfEmpty(false);
    }
  };

  const optionalCommentAdd = (id, comment) => {
    if (comment) {
      dispatch(addComment({ id, comment }));
    }
    // console.log(id, comment);
  };

  return (
    <section className={styles.root}>
      <h2 className={styles.cartTitle}>Your cart</h2>
      {cartProducts.length === 0 ? (
        <div className={styles.emptyCart}>Your cart is empty!</div>
      ) : (
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
                  <div className={styles.productComment}>
                    <h4>Add comment to product: (optional)</h4>
                    <textarea
                      onBlur={(e) =>
                        optionalCommentAdd(cartProduct.id, e.target.value)
                      }
                    />
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
              <p>$ {subtotal}</p>
            </div>
            <div className={styles.delivery}>
              <h5>Delivery cost</h5>
              <p>$ {subtotal >= 150 ? "0" : "20"}</p>
            </div>
            <div className={styles.total}>
              <h5>Total</h5>

              {subtotal >= freeDeliveryPrice ? (
                <div className={styles.totalPriceContainer}>
                  <p className={styles.discountDelivery}>$ {subtotal + 20}</p>
                  <p className={styles.totalPrice}>$ {subtotal}</p>
                </div>
              ) : (
                <p>$ {subtotal + 20}</p>
              )}
            </div>
            <div className={styles.freeDelivery}>
              {subtotal >= freeDeliveryPrice ? <span>Delivery free!</span> : ""}
            </div>
            <Link to={cartProducts.length !== 0 ? "/order" : "/cart"}>
              <Button
                onClick={() => checkoutActions(cartProducts.length)}
                style={styles.checkout}
                text="PROCCED TO CHECKOUT"
              />
            </Link>
            {ifEmpty && (
              <div className={styles.ifEmpty}>Add items to continue!</div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
