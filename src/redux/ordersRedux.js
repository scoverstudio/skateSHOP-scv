/* selectors */

/* action name creator */
const reducerName = "cart";
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */

/* action creators */

/* reducer */
export const orderReducer = (statePart = [], action = {}) => {
  switch (action.type) {
    default:
      return statePart;
  }
};
