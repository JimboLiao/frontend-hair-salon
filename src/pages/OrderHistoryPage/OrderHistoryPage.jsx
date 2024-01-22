import { EmptyOrderHistory, OrderHistoryItem } from "../../components/order";
import { StyledContainer } from "../../components/common";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { getOrdersWithProductsApi } from "../../api";

const StyledOrderHistoryPage = styled.div`
  padding-top: 64px;
  padding-bottom: 64px;
  .orderhistory__title {
    padding-bottom: 32px;
    font-size: 32px;
    text-align: center;
  }
`;

const OrderHistoryPage = () => {
  const convertToLocaleDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString(); // month starts with 0
    const day = date.getDate().toString();

    // 組合成 yyyy-mm-dd 格式
    return `${year}-${month}-${day}`;
  };

  const [items, setItems] = useState([]);
  useEffect(() => {
    const getOrdersApi = async () => {
      const data = await getOrdersWithProductsApi();
      const orders = data.data;
      for (let i = 0; i < orders.length; i++) {
        orders[i].subtotal = orders[i].products.reduce(
          (sum, product) => (sum += product.price * product.amount),
          0
        );
        orders[i].total = orders[i].subtotal + orders[i].delivery;
        orders[i].date = convertToLocaleDate(orders[i].date);
      }

      setItems(orders);
    };
    getOrdersApi();
  }, []);

  return items.length === 0 ? (
    <StyledOrderHistoryPage>
      <StyledContainer>
        <div className="orderhistory__title">
          <h2>My Orders</h2>
        </div>
        <EmptyOrderHistory />
      </StyledContainer>
    </StyledOrderHistoryPage>
  ) : (
    <StyledOrderHistoryPage>
      <StyledContainer>
        <div className="orderhistory__title">
          <h2>My Orders</h2>
        </div>
        {items.map((item, index) => {
          return (
            <OrderHistoryItem itemData={item} key={index}></OrderHistoryItem>
          );
        })}
      </StyledContainer>
    </StyledOrderHistoryPage>
  );
};

export default OrderHistoryPage;
