import { API_URL } from "../config";
import axios from "axios";

/* selectors */

/* action name creator */
const reducerName = "order";
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
const ORDER_REQUEST = createActionName("ORDER_REQUEST");
const FETCH_START = createActionName("FETCH_START");
const FETCH_SUCCESS = createActionName("FETCH_SUCCESS");
const FETCH_ERROR = createActionName("FETCH_ERROR");
/* action creators */
export const orderRequest = (payload) => ({ payload, type: ORDER_REQUEST });
export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchSuccess = (payload) => ({ payload, type: FETCH_SUCCESS });
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });

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
export const addOrderRequestUser = (order) => {
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
export const fetchOrders = (setOrders) => {
  return (dispatch) => {
    dispatch(fetchStarted());
    axios
      .get(`${API_URL}/orders`)
      .then((res) => {
        setOrders(res.data);
        dispatch(fetchSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export const orderReducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case ORDER_REQUEST: {
      return [...statePart, action.payload];
    }
    case FETCH_START: {
      return {
        ...statePart,
      };
    }
    case FETCH_SUCCESS: {
      return [...action.payload];
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    default:
      return statePart;
  }
};
