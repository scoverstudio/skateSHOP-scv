/* selectors */

/* action name creator */
const reducerName = "cart";
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
const ORDER_REQUEST = createActionName("ORDER_REQUEST");

/* action creators */
export const orderRequest = (payload) => ({ payload, type: ORDER_REQUEST });

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
