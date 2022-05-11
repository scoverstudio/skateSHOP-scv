import axios from "axios";
import { API_URL } from "../config";
import initialState from "./initialState";

// selectors
export const getAllProducts = (state) => state.products;

// action name creator
const reducerName = "products";
const createActionName = (name) => `app/${reducerName}/${name}`;

// action types
const FETCH_START = createActionName("FETCH_START");
const FETCH_SUCCESS = createActionName("FETCH_SUCCESS");
const FETCH_ERROR = createActionName("FETCH_ERROR");

// action creators
export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchSuccess = (payload) => ({ payload, type: FETCH_SUCCESS });
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });

// thunk creators
export const fetchProducts = (setProducts) => {
  return (dispatch) => {
    if (initialState.products.length === 0) {
      dispatch(fetchStarted());
      axios
        .get(`${API_URL}/products`)
        .then((res) => {
          setProducts(res.data);
          dispatch(fetchSuccess(res.data));
        })
        .catch((err) => {
          dispatch(fetchError(err.message || true));
        });
    }
  };
};
export const fetchProductById = (id, setProduct, setIsLoading) => {
  console.log(id);
  return (dispatch) => {
    dispatch(fetchStarted());
    axios
      .get(`${API_URL}/products/${id}`)
      .then((res) => {
        console.log(res);
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        dispatch(fetchError(err.message || true));
      });
  };
};

// reducer
export const productsReducer = (statePart = [], action = {}) => {
  switch (action.type) {
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
