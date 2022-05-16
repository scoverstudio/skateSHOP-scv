/* selectors */
export const getAllProductsInCart = ({ cart }) => cart.products;
export const getFreeDeliveryPrice = ({ cart }) => cart.freeDelivery;
export const getCount = ({ cart }) => cart.products.length;
export const getSubtotalPrice = ({ cart }) => {
  return cart.products.reduce((total, product) => {
    return product.totalPrice + total;
  }, 0);
};
/* action name creator */
const reducerName = "cart";
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
const ADD_PRODUCT = createActionName("ADD_PRODUCT");
const ADD_PRODUCT_LS = createActionName("ADD_PRODUCT_LS");
const REMOVE_PRODUCT = createActionName("REMOVE_PRODUCT");
const CLEAR_CART = createActionName("CLEAR_CART");
const INCREMENT = createActionName("INCREMENT");
const DECREMENT = createActionName("DECREMENT");
const TOTAL_PRICE_CHANGE = createActionName("TOTAL_PRICE_CHANGE");
const QUANTITY_CHANGE = createActionName("QUANTITY_CHANGE");

/* action creators */
export const addProduct = (payload) => ({ payload, type: ADD_PRODUCT });
export const addProductLS = (payload) => ({ payload, type: ADD_PRODUCT_LS });
export const changeQuantity = (payload) => ({ payload, type: QUANTITY_CHANGE });
export const removeProduct = (payload) => ({ payload, type: REMOVE_PRODUCT });
export const clearCart = (payload) => ({ payload, type: CLEAR_CART });
export const increment = (payload) => ({ payload, type: INCREMENT });
export const decrement = (payload) => ({ payload, type: DECREMENT });
export const totalPriceChange = (payload) => ({
  payload,
  type: TOTAL_PRICE_CHANGE,
});

/* thunk */

export const fetchCartFromLocalStorage = () => {
  return (dispatch) => {
    const cartProducts = JSON.parse(
      localStorage.getItem("cartProducts") || "[]"
    );
    dispatch(addProductLS(cartProducts));
  };
};

/* reducer */
export const cartReducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case ADD_PRODUCT: {
      return {
        ...statePart,
        products: [...statePart.products, action.payload],
      };
    }
    case ADD_PRODUCT_LS: {
      return {
        ...statePart,
        products: [...action.payload],
      };
    }
    case QUANTITY_CHANGE: {
      return {
        ...statePart,
        cart: [
          ...statePart.products.find((product) =>
            product.id === action.payload.id
              ? product.quantity++
              : product.quantity
          ),
        ],
      };
    }
    case REMOVE_PRODUCT: {
      return {
        products: [
          ...statePart.products.filter(
            (product) => product.id !== action.payload
          ),
        ],
      };
    }

    case INCREMENT: {
      return {
        ...statePart,
        products: [
          ...statePart.products.filter((product) =>
            product.id === action.payload
              ? product.quantity++
              : product.quantity
          ),
        ],
      };
    }
    case DECREMENT: {
      return {
        ...statePart,
        products: [
          ...statePart.products.filter((product) =>
            product.id === action.payload
              ? product.quantity--
              : product.quantity
          ),
        ],
      };
    }
    case CLEAR_CART: {
      return { products: [] };
    }
    case TOTAL_PRICE_CHANGE: {
      return {
        ...statePart,
        products: [
          ...statePart.products.filter((product) =>
            product.id === action.payload
              ? (product.totalPrice = product.price * product.quantity)
              : product.price
          ),
        ],
      };
    }
    default:
      return statePart;
  }
};
