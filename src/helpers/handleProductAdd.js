import { addProduct, increment, totalPriceChange } from "../redux/cartRedux";

export const handleProductAdd = (product, cartProducts, dispatch) => {
  const productAlreadyInCart = cartProducts.find(
    (item) => item.id === product.id
  );

  if (productAlreadyInCart) {
    if (
      productAlreadyInCart.quantity < 10 &&
      productAlreadyInCart.quantity >= 1
    ) {
      dispatch(increment(product.id));
      dispatch(totalPriceChange(product.id));
    }
  } else {
    dispatch(
      addProduct({
        ...product,
        totalPrice: product.price,
        quantity: 1,
        comment: "",
      })
    );
  }
};
