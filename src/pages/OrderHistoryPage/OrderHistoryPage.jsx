import { EmptyOrderHistory, OrderHistoryItem } from "../../components/order";
import { StyledContainer } from "../../components/common";
import { styled } from "styled-components";

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
  const items = [
    {
      date: "12/30",
      status: "processing",
      subtotal: 460,
      delivery: 40,
      total: 500,
      products: [
        {
          productName: "Shampoo",
          amount: 2,
          price: 230,
          imgUrl: "/images/products-2-1.png",
        },
      ],
    },
  ];
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
