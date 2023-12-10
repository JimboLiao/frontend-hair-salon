import { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const deliverPrice = 40;
  const subTotal = cart?.reduce(
    (accumulator, current) =>
      (accumulator += current.isPaid ? 0 : current.price * current.amount),
    0
  );
  const grandTotal = subTotal + deliverPrice;
  const orderSubTotal = cart?.reduce(
    (accumulator, current) =>
      (accumulator += current.isPaid ? current.price * current.amount : 0),
    0
  );
  const orderGrandTotal = subTotal + deliverPrice;

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        deliverPrice,
        subTotal,
        grandTotal,
        orderGrandTotal,
        orderSubTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
export default CartProvider;
