import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartReducer } from "./cartRedux";
import { categoriesReducer } from "./categoriesRedux";
import { categoryNamesReducer } from "./categoryNames";
import initialState from "./initialState";
import { orderReducer } from "./ordersRedux";
import { productsReducer } from "./productsRedux";

const reducers = {
  categories: categoriesReducer,
  categoryNames: categoryNamesReducer,
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
};

const combinedReducers = combineReducers(reducers);

export const store = createStore(
  combinedReducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
