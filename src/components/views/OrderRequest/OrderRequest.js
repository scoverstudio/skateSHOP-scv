import React from "react";
import { useDispatch } from "react-redux";
import { orderRequest } from "../../../redux/ordersRedux";
import OrderForm from "../OrderForm/OrderForm";

const OrderRequest = () => {
  const dispatch = useDispatch();

  const handleSubmit = (order) => {
    dispatch(orderRequest(order));
  };

  return (
    <>
      <OrderForm orderRequest={handleSubmit} />
    </>
  );
};

export default OrderRequest;
