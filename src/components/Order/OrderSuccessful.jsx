import { styled } from "styled-components";
import { StyledContainer } from "../common";
import OrderList from "./OrderList";
import OrderSummary from "./OrderSummary";
import { CartContext } from "../../context/CartContext";
import { useContext, useEffect, useState } from "react";

const StyledOrderContainer = styled.div`
  padding-top: 64px;
  padding-bottom: 64px;

  .order__title {
    padding-bottom: 32px;
    font-size: 32px;
    text-align: center;
  }
`;

const OrderSuccessful = () => {
  const { orderSubTotal, deliverPrice, cart, setCart } =
    useContext(CartContext);

  const [subTotal] = useState(orderSubTotal);
  const [delivery] = useState(deliverPrice);
  const [orderItems, setOrderItems] = useState([]);
  useEffect(() => {
    function handleInitialCartUpdate() {
      const paidItems = cart.filter((el) => el.isPaid === true);
      setOrderItems(paidItems);

      const remainingItems = cart.filter((el) => el.isPaid !== true);
      setCart(remainingItems);
    }

    handleInitialCartUpdate();
  }, []);

  return (
    <StyledContainer>
      <StyledOrderContainer>
        <div className="order__title">
          <h2>Thank You!</h2>
          <p>Your order has been successful.</p>
        </div>
      </StyledOrderContainer>
      <OrderList orderItems={orderItems} />
      <OrderSummary
        subTotal={subTotal}
        deliverPrice={delivery}
        grandTotal={subTotal + delivery}
      />
    </StyledContainer>
  );
};

export default OrderSuccessful;
