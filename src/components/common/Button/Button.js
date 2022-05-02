import React from "react";
import styles from "./Button.module.scss";
import PropTypes from "prop-types";
import clsx from "clsx";

const Button = ({ text, onClick, style }) => {
  return (
    <button onClick={onClick} className={clsx(styles.button, style)}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.string,
};
export default Button;
