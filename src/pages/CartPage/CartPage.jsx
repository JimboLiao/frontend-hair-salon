import { styled } from "styled-components";
import { StyledContainer, StyledLink } from "../../components/common";
import { CartContext } from "../../context/CartContext";
import { CartItem, CartSummary, EmptyCart } from "../../components/cart";
import { Button, Stack } from "@mui/material";
import { useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const StyledCart = styled.section`
  padding-top: 64px;
  padding-bottom: 64px;

  .cart__title {
    padding-bottom: 32px;
    font-size: 32px;
    text-align: center;
  }
`;

const CartPage = () => {
  let navigate = useNavigate();
  const { cart, deliverPrice, subTotal, grandTotal } = useContext(CartContext);

  const handleCheckOut = (event) => {
    if (Cookies.get("id")) {
      navigate("/payment");
    } else {
      navigate("/login");
    }
  };
  // empty cart
  if (cart.length === 0)
    return (
      <StyledCart>
        <StyledContainer>
          <div className="cart__title">
            <h2>My Shopping Cart</h2>
          </div>
          <EmptyCart></EmptyCart>
        </StyledContainer>
      </StyledCart>
    );
  // display cart items
  else
    return (
      <main>
        <StyledCart>
          <StyledContainer>
            <div className="cart__title">
              <h2>My Shopping Cart</h2>
            </div>
            {cart.map((item) => {
              if (item.isPaid) return <></>;
              else return <CartItem key={item.id} item={item}></CartItem>;
            })}
            <CartSummary
              subTotal={subTotal}
              deliverPrice={deliverPrice}
              grandTotal={grandTotal}
            ></CartSummary>
            <Stack direction="row" justifyContent="flex-end">
              <Button
                component={StyledLink}
                variant="contained"
                onClick={handleCheckOut}
              >
                Check Out
              </Button>
            </Stack>
          </StyledContainer>
        </StyledCart>
      </main>
    );
};

export default CartPage;
