import React from "react";
import { Provider } from "react-redux";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import { store } from "./redux/store";

import MainLayout from "./components/layout/MainLayout/MainLayout";
import Homepage from "./components/views/Homepage/Homepage";
import Cart from "./components/views/Cart/Cart";
import OrderForm from "./components/views/OrderForm/OrderForm";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<OrderForm />} />
          </Routes>
        </MainLayout>
      </Router>
    </Provider>
  );
};

export { App };
