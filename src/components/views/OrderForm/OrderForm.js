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

  const [shipmentName, setShipmentName] = useState("");
  const [shipmentSurname, setShipmentSurname] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");
  const [apartament, setApartament] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [shipmentMethod, setShipmentMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const cartProducts = useSelector((state) => getAllProductsInCart(state));

  const onSubmit = () => {
    console.log("click");
    const order = {
      userInformations: {
        name: name,
        surname: surname,
        email: email,
        phoneNumber: phone,
      },
      shipmentInformations: {
        name: shipmentName,
        surname: shipmentSurname,
        country: country,
        region: region,
        street: street,
        building: building,
        apartament: apartament,
        city: city,
        zipCode: zipCode,
        shipmentMethod,
        paymentMethod,
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
            <label htmlFor="shipmentName">Name</label>
            <label htmlFor="shipmentSurname">Surname</label>
            <input
              {...register("shipmentName", {
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
              type="text"
              placeholder={
                errors.shipmentName ? errors.shipmentName.message : "Name"
              }
              onChange={(e) => setShipmentName(e.target.value)}
              className={clsx(errors.shipmentName && styles.errorInput)}
            />
            <input
              {...register("shipmentSurname", {
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
              placeholder={
                errors.shipmentSurname
                  ? errors.shipmentSurname.message
                  : "Surname"
              }
              onChange={(e) => setShipmentSurname(e.target.value)}
              className={clsx(errors.shipmentSurname && styles.errorInput)}
            />
            <label htmlFor="Country">Country</label>
            <label htmlFor="Region">Region</label>
            <input
              {...register("country", {
                required: {
                  value: true,
                  message: "Country field is required",
                },
                minLength: {
                  value: 3,
                  message: "min. 3 characters",
                },
              })}
              type="text"
              placeholder={errors.country ? errors.country.message : "Country"}
              onChange={(e) => setCountry(e.target.value)}
              className={clsx(errors.country && styles.errorInput)}
            />
            <input
              {...register("region", {
                required: {
                  value: true,
                  message: "Region field is required",
                },
                minLength: {
                  value: 3,
                  message: "min. 3 characters",
                },
              })}
              type="text"
              placeholder={errors.region ? errors.region.message : "Region"}
              onChange={(e) => setRegion(e.target.value)}
              className={clsx(errors.region && styles.errorInput)}
            />
            <div className={styles.threeInRowContainer}>
              <label htmlFor="Street">Street</label>
              <label htmlFor="Building">Building</label>
              <label htmlFor="Apartment">Apartment</label>
              <input
                {...register("street", {
                  required: {
                    value: true,
                    message: "Street field is required",
                  },
                  minLength: {
                    value: 3,
                    message: "min. 3 characters",
                  },
                })}
                type="text"
                placeholder={errors.street ? errors.street.message : "Street"}
                onChange={(e) => setStreet(e.target.value)}
                className={clsx(errors.street && styles.errorInput)}
              />
              <input
                {...register("building", {
                  required: {
                    value: true,
                    message: "Building field is required",
                  },
                })}
                type="text"
                placeholder={
                  errors.building ? errors.building.message : "Building"
                }
                onChange={(e) => setBuilding(e.target.value)}
                className={clsx(errors.building && styles.errorInput)}
              />
              <input
                {...register("apartament", {
                  required: {
                    value: true,
                    message: "Apartament field is required",
                  },
                })}
                type="text"
                placeholder={
                  errors.apartament ? errors.apartament.message : "Apartament"
                }
                onChange={(e) => setApartament(e.target.value)}
                className={clsx(errors.apartament && styles.errorInput)}
              />
            </div>
            <label htmlFor="City">City</label>
            <label htmlFor="ZIP code">ZIP code</label>
            <input
              {...register("city", {
                required: {
                  value: true,
                  message: "City field is required",
                },
                minLength: {
                  value: 3,
                  message: "min. 3 characters",
                },
              })}
              type="text"
              placeholder={errors.city ? errors.city.message : "City"}
              onChange={(e) => setCity(e.target.value)}
              className={clsx(errors.city && styles.errorInput)}
            />
            <input
              {...register("zipCode", {
                required: {
                  value: true,
                  message: "Zip code field is required",
                },
                pattern: {
                  value: /[0-9]{2}-[0-9]{3}/,
                  message: "Wrong zip code!",
                },
              })}
              type="text"
              placeholder={errors.zipCode ? errors.zipCode.message : "Zip code"}
              onChange={(e) => setZipCode(e.target.value)}
              className={clsx(errors.zipCode && styles.errorInput)}
            />
          </fieldset>
          <div className={styles.requiredInformation}>
            <span className={styles.required}>*</span> - required
          </div>
        </div>
        <div className={styles.methods}>
          <div className={styles.shippingMethod}>
            <h3>Shipping method</h3>
            <div className={styles.methodsContainer}>
              <input
                {...register("shippingMethod", {
                  required: {
                    value: true,
                    message: "Shipping method is required",
                  },
                })}
                type="radio"
                id="method1"
                name="method1"
                onClick={() => setShipmentMethod("Delivery by courier")}
              />
              <label htmlFor="method">Delivery by courier</label>
              <input
                {...register("shippingMethod", {
                  required: {
                    value: true,
                    message: "Shipping method is required",
                  },
                })}
                type="radio"
                id="method1"
                name="method1"
                onClick={() => setShipmentMethod("InPost delivery")}
              />
              <label htmlFor="method">InPost delivery</label>
              <input
                {...register("shippingMethod", {
                  required: {
                    value: true,
                    message: "Shipping method is required",
                  },
                })}
                type="radio"
                id="method1"
                name="method1"
                onClick={() => setShipmentMethod("Delivery to shop")}
              />
              <label htmlFor="method">Delivery to shop</label>
            </div>
            {errors.shippingMethod && (
              <p className={styles.methodError}>
                {errors.shippingMethod.message}
              </p>
            )}
          </div>
          <div className={styles.paymentMethod}>
            <h3>Payment method</h3>
            <div className={styles.methodsContainer}>
              <input
                {...register("paymentMethod", {
                  required: {
                    value: true,
                    message: "Payment method  is required",
                  },
                })}
                type="radio"
                id="method2"
                name="method2"
                onClick={() => setPaymentMethod("Bank transfer")}
              />
              <label htmlFor="method">Bank transfer</label>
              <input
                {...register("paymentMethod", {
                  required: {
                    value: true,
                    message: "Payment method  is required",
                  },
                })}
                type="radio"
                id="method2"
                name="method2"
                onClick={() => setShipmentMethod("Upon receipt")}
              />
              <label htmlFor="method">Upon receipt</label>
              <input
                {...register("paymentMethod", {
                  required: {
                    value: true,
                    message: "Payment method  is required",
                  },
                })}
                type="radio"
                id="method2"
                name="method2"
                onClick={() => setShipmentMethod("payment in the store")}
              />
              <label htmlFor="method">Payment in the store</label>
            </div>
            {errors.paymentMethod && (
              <p className={styles.methodError}>
                {errors.paymentMethod.message}
              </p>
            )}
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
      {succesOrder && (
        <div className={styles.orderStatus}>
          You have successfully placed an order
        </div>
      )}
      {failedOrder && (
        <div className={styles.orderStatus}>Your cart is empty!</div>
      )}
    </section>
  );
};

OrderForm.propTypes = {
  orderRequest: PropTypes.func,
};

export default OrderForm;
