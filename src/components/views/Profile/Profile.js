import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./Profile.module.scss";
import { useAuth0 } from "@auth0/auth0-react";
import clsx from "clsx";
import Login from "../Login/Login";
import { fetchOrders } from "../../../redux/ordersRedux";

const Profile = () => {
  const [currentContent, setCurrentContent] = useState("Profile");
  const [orders, setOrders] = useState(null);
  const dispatch = useDispatch();
  const { user, isAuthenticated, logout, isLoading } = useAuth0();

  useEffect(() => {
    dispatch(fetchOrders(setOrders));
  }, [dispatch]);

  return isAuthenticated ? (
    <div className={styles.root}>
      <div className={styles.profileContainer}>
        <div className={styles.list}>
          <ul>
            <li
              className={clsx(currentContent === "Profile" && styles.active)}
              onClick={() => setCurrentContent("Profile")}
            >
              Profile
            </li>
            <li
              className={clsx(currentContent === "Favorite" && styles.active)}
              onClick={() => setCurrentContent("Favorite")}
            >
              Favorite
            </li>
            <li
              className={clsx(currentContent === "Orders" && styles.active)}
              onClick={() => setCurrentContent("Orders")}
            >
              Orders
            </li>
          </ul>
          <button onClick={() => logout()} className={styles.logout}>
            Log out
          </button>
        </div>
        <div className={styles.panels}>
          {currentContent === "Profile" && (
            <div className={clsx(styles.panel, styles.profileInfo)}>
              <div className={styles.image}>
                <img alt="user" src={`${user.picture}`} />
                <div className={styles.nickname}>{user.nickname}</div>
              </div>
              <div className={styles.profile}>
                <p>Name: {user.given_name}</p>
                <p>Surname: {user.family_name}</p>
                <p>Email: {user.email}</p>
              </div>
            </div>
          )}
          {currentContent === "Favorite" && <div>222</div>}
          {currentContent === "Orders" && (
            <div>
              {orders.map(
                (order, index) =>
                  order.userInformations.userId === user.sub && (
                    <div key={index}>{order.userInformations.userId}</div>
                  )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : isLoading ? (
    <div className={styles.loading}>Loading!</div>
  ) : (
    <Login text={"Log in to your account!"} />
  );
};

export default Profile;
