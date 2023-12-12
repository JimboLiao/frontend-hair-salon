import { Button } from "@mui/material";
import { StyledLink } from "../common";
import styled from "styled-components";

const StyledEmptyOrder = styled.div`
  font-size: 1.5em;
  text-align: center;
  padding: 2em;
`;

const EmptyOrderHistory = () => {
  return (
    <>
      <StyledEmptyOrder>No order history.</StyledEmptyOrder>
      <Button variant="contained" component={StyledLink} to="/products">
        Go to market
      </Button>
    </>
  );
};

export default EmptyOrderHistory;
