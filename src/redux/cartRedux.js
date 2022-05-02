/* selectors */
export const getAllProductsInCart = ({ cart }) => cart.products;
export const getCount = ({ cart }) => cart.products.length;

/* action name creator */
const reducerName = "cart";
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
const ADD_PRODUCT = createActionName("ADD_PRODUCT");
const REMOVE_PRODUCT = createActionName("REMOVE_PRODUCT");
const CLEAR_CART = createActionName("CLEAR_CART");
const INCREMENT = createActionName("INCREMENT");
const DECREMENT = createActionName("DECREMENT");

/* action creators */
export const addProduct = (payload) => ({ payload, type: ADD_PRODUCT });
export const removeProduct = (payload) => ({ payload, type: REMOVE_PRODUCT });
export const clearCart = (payload) => ({ payload, type: CLEAR_CART });
export const increment = (payload) => ({ payload, type: INCREMENT });
export const decrement = (payload) => ({ payload, type: DECREMENT });

/* reducer */
export const cartReducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case ADD_PRODUCT: {
      return { products: [...statePart.products, action.payload] };
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
    default:
      return statePart;
  }
};
