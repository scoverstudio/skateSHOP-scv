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
const REMOVE_PRODUCT = createActionName("REMOVE_PRODUCT");
const CLEAR_CART = createActionName("CLEAR_CART");
const INCREMENT = createActionName("INCREMENT");
const DECREMENT = createActionName("DECREMENT");
const TOTAL_PRICE_CHANGE = createActionName("TOTAL_PRICE_CHANGE");
// const TOTAL_PRICE_DECREMENT = createActionName("TOTAL_PRICE_DECREMENT");

/* action creators */
export const addProduct = (payload) => ({ payload, type: ADD_PRODUCT });
export const removeProduct = (payload) => ({ payload, type: REMOVE_PRODUCT });
export const clearCart = (payload) => ({ payload, type: CLEAR_CART });
export const increment = (payload) => ({ payload, type: INCREMENT });
export const decrement = (payload) => ({ payload, type: DECREMENT });
export const totalPriceChange = (payload) => ({
  payload,
  type: TOTAL_PRICE_CHANGE,
});

/* reducer */
export const cartReducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case ADD_PRODUCT: {
      return {
        ...statePart,
        products: [...statePart.products, action.payload],
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
