import React from "react";
import styles from "./Button.module.scss";
import PropTypes from "prop-types";

const Button = ({ text, onClickAction, product }) => {
  return (
    <button onClick={() => onClickAction(product)} className={styles.button}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClickAction: PropTypes.func,
  product: PropTypes.object,
};
export default Button;
