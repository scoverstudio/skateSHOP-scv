import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { getAllProductsInCart } from "../../../redux/cartRedux";
import styles from "./OrderForm.module.scss";
import clsx from "clsx";

const OrderForm = ({ orderRequest }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [succesOrder, setSuccesOrder] = useState(false);
  const [failedOrder, setFailedOrder] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const cartProducts = useSelector((state) => getAllProductsInCart(state));

  const onSubmit = () => {
    const order = {
      userInformations: {
        name: name,
        surname: surname,
        email: email,
        phoneNumber: phone,
      },
      shipmentInformations: {
        name: "test",
        surname: "test",
        country: "test",
        region: "test",
        street: "test",
        building: "test",
        apartament: null,
        city: "test",
        zipCode: "test",
      },
      items: {
        ...cartProducts,
      },
    };
    if (cartProducts.length !== 0) {
      orderRequest(order);
      setSuccesOrder(true);
    } else {
      setFailedOrder(true);
    }
  };

  return (
    <section className={styles.root}>
      <h2>Order informations</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="order-form"
        className={styles.orderForm}
      >
        <div className={styles.shipmentInfo}>
          <fieldset>
            <h3>User informations</h3>
            <label htmlFor="name">
              Name <span className={styles.required}>*</span>
            </label>
            <label htmlFor="surname">
              Surname <span className={styles.required}>*</span>
            </label>
            <input
              {...register("name", {
                required: {
                  value: true,
                  message: "Name field is required",
                },
                minLength: {
                  value: 3,
                  message: "min. 3 characters",
                },
                maxLength: {
                  value: 15,
                  message: "max. 15 characters",
                },
              })}
              name="name"
              type="text"
              placeholder={errors.name ? errors.name.message : "Name"}
              onChange={(e) => setName(e.target.value)}
              className={clsx(errors.name && styles.errorInput)}
            />

            <input
              {...register("surname", {
                required: {
                  value: true,
                  message: "Surname field is required",
                },
                minLength: {
                  value: 3,
                  message: "min. 3 characters",
                },
                maxLength: {
                  value: 15,
                  message: "max. 15 characters",
                },
              })}
              type="text"
              name="surname"
              placeholder={errors.surname ? errors.surname.message : "Surname"}
              onChange={(e) => setSurname(e.target.value)}
              className={clsx(errors.surname && styles.errorInput)}
            />

            <label htmlFor="adress email">
              Adress email <span className={styles.required}>*</span>
            </label>
            <label htmlFor="phone number">
              Phone number <span className={styles.required}>*</span>
            </label>
            <input
              {...register("email", {
                required: {
                  value: true,
                  message: "Email field is required",
                },
                pattern: {
                  value:
                    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
                  message: "wrong email!",
                },
              })}
              type="text"
              name="email"
              placeholder={errors.email ? errors.email.message : "Adress email"}
              onChange={(e) => setEmail(e.target.value)}
              className={clsx(errors.email && styles.errorInput)}
            />

            <input
              {...register("phone", {
                required: {
                  value: true,
                  message: "Phone number field is required",
                },
                pattern: {
                  value: /[0-9]{3}-[0-9]{3}-[0-9]{3}/,
                  message: "Wrong phone number!",
                },
              })}
              type="phone"
              name="phone"
              placeholder={errors.phone ? errors.phone.message : "Phone number"}
              onChange={(e) => setPhone(e.target.value)}
              className={clsx(errors.phone && styles.errorInput)}
            />
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
          <div className={styles.requiredInformation}>
            <span className={styles.required}>*</span> - required
          </div>
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
      <div className={styles.control}>
        <button type="submit" form="order-form">
          Order and pay
        </button>
      </div>
      {succesOrder && <div>You have successfully placed an order</div>}
      {failedOrder && <div>Your cart is empty!</div>}
    </section>
  );
};

OrderForm.propTypes = {
  orderRequest: PropTypes.func,
};

export default OrderForm;
