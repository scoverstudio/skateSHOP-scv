import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styles from "./Login.module.scss";

const Login = ({ text }) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className={styles.root}>
      <div className={styles.loginContainer}>
        <h2>{text}</h2>
        <button onClick={() => loginWithRedirect()}>Log in</button>
      </div>
    </div>
  );
};

Login.propTypes = {
  text: PropTypes.string,
};

export default Login;
