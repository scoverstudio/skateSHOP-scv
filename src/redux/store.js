import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartReducer } from "./cartRedux";
import { categoriesReducer } from "./categoriesRedux";
import initialState from "./initialState";
import { productsReducer } from "./productsRedux";

const reducers = {
  categories: categoriesReducer,
  products: productsReducer,
  cart: cartReducer,
};

const combinedReducers = combineReducers(reducers);

export const store = createStore(
  combinedReducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);