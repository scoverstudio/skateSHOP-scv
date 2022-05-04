import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { getAllProductsInCart } from "../../../redux/cartRedux";
import styles from "./OrderForm.module.scss";

const OrderForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const cartProducts = useSelector((state) => getAllProductsInCart(state));

  const onSubmit = (data) => {};

  return (
    <section className={styles.root}>
      <h2>Order informations</h2>
      <form className={styles.orderForm}>
        <div className={styles.shipmentInfo}>
          <fieldset>
            <h3>User informations</h3>
            <label htmlFor="Name">Name</label>
            <label htmlFor="Surname">Surname</label>
            <input type="text" placeholder="Name"></input>
            <input type="text" placeholder="Surname"></input>

            <label htmlFor="Adress email">Adress email</label>
            <label htmlFor="Phone number">Phone number</label>
            <input type="text" placeholder="Adress email"></input>
            <input type="text" placeholder="Phone number"></input>
          </fieldset>
          <fieldset>
            <h3>Shipment informations</h3>

            <label htmlFor="Name">Name</label>
            <label htmlFor="Surname">Surname</label>
            <input type="text" placeholder="Name"></input>
            <input type="text" placeholder="Surname"></input>

            <label htmlFor="Country">Country</label>
            <label htmlFor="Region">Region</label>
            <input type="text" placeholder="Country"></input>
            <input type="text" placeholder="Region"></input>

            <div className={styles.threeInRowContainer}>
              <label htmlFor="Street">Street</label>
              <label htmlFor="Building">Building</label>
              <label htmlFor="Apartment">Apartment</label>
              <input type="text" placeholder="Street"></input>
              <input type="text" placeholder="Building"></input>
              <input type="text" placeholder="Apartment"></input>
            </div>

            <label htmlFor="City">City</label>
            <label htmlFor="ZIP code">ZIP code</label>
            <input type="text" placeholder="City"></input>
            <input type="text" placeholder="ZIP code"></input>
          </fieldset>
        </div>
        <div className={styles.methods}>
          <div className={styles.shippingMethod}>
            <h3>Shipment method</h3>
            <fieldset>
              <input type="radio" id="method" name="method1" />
              <label htmlFor="method">Delivery by courier</label>
            </fieldset>
            <fieldset>
              <input type="radio" id="method" name="method1" />
              <label htmlFor="method">InPost delivery</label>
            </fieldset>
            <fieldset>
              <input type="radio" id="method" name="method1" />
              <label htmlFor="method">Delivery to shop</label>
            </fieldset>
          </div>
          <div className={styles.paymentMethod}>
            <h3>Payment method</h3>
            <fieldset>
              <input type="radio" id="method" name="method2" />
              <label htmlFor="method">Bank transfer</label>
            </fieldset>
            <fieldset>
              <input type="radio" id="method" name="method2" />
              <label htmlFor="method">Upon receipt</label>
            </fieldset>
            <fieldset>
              <input type="radio" id="method" name="method2" />
              <label htmlFor="method">Delivery to shop</label>
            </fieldset>
          </div>
        </div>
      </form>
      <div className={styles.orderSummary}>
        <h3>Order Summary</h3>
        <div className={styles.orderedProducts}>
          <div className={styles.descriptions}>
            <p>Product</p>
            <p>Quantity</p>
            <p>Cost</p>
          </div>
          {cartProducts.map((product) => (
            <div className={styles.singleProduct} key={product.id}>
              <h4>{product.name}</h4>
              <span>{product.quantity}</span>
              <span>$ {product.price * product.quantity}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
