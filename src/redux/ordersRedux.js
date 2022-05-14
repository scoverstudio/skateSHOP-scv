import { API_URL } from "../config";
import axios from "axios";

/* selectors */

/* action name creator */
const reducerName = "cart";
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
const ORDER_REQUEST = createActionName("ORDER_REQUEST");

/* action creators */
export const orderRequest = (payload) => ({ payload, type: ORDER_REQUEST });

/* thunk creators */

export const addOrderRequest = (order) => {
  return async (dispatch) => {
    await axios
      .post(`${API_URL}/orders`, order)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

/* reducer */
export const orderReducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case ORDER_REQUEST: {
      return [...statePart, action.payload];
    }
    default:
      return statePart;
  }
};
