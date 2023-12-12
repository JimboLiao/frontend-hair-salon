import React from "react";
import styled from "styled-components";
import { ProductImage } from "../common";
const StyledItemContainer = styled.div`
  border: 2px solid #ccc;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  min-width: 280px;
  margin-bottom: 32px;

  > div {
    width: 100%;
    padding: 20px;
  }
  .status-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .date-box {
      width: 30%;
    }
    .status-box {
      width: 30%;
    }
  }
  .product-container {
    display: flex;
    padding: 15px;
    .img-container {
      width: 30%;
    }
    .product-info {
      width: 35%;
      text-align: left;
      h3 {
        font-size: 36px;
        padding-bottom: 18px;
      }
      .product-price {
        font-size: 24px;
        padding-bottom: 8px;
      }
      .product-amount {
        font-size: 24px;
      }
    }
    .product-summary {
      width: 35%;
      text-align: right;
      padding-right: 64px;
    }
  }
  .product-total {
    padding: 48px 0px 0px 0px;
    font-size: 24px;
  }
`;

const StyledSummaryContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  text-align: right;
  padding-right: 10px;
  margin-bottom: 16px;
  font-size: 20px;
  color: #3072ff;

  .grandTotal {
    font-size: 24px;
    padding-top: 10px;
  }
`;

const OrderHistoryItem = ({ itemData }) => {
  const { date, status, subtotal, delivery, total, products } = itemData;

  return (
    <StyledItemContainer>
      <div>
        <div className="status-container">
          <div className="date-box">
            <p>Date: {date}</p>
          </div>
          <div className="status-box">
            <p>Status: {status}</p>
          </div>
        </div>

        {products.map((product, index) => (
          <div className="product-container" key={index}>
            <div className="img-container">
              <ProductImage $backgroundImageUrl={product.imgUrl} />
            </div>
            <div className="product-info">
              <h3>{product.productName}</h3>
              <p className="product-price">NT$ {product.price}</p>
              <p className="product-amount">Amount : {product.amount}</p>
            </div>
            <div className="product-summary">
              <div className="product-total">
                NT$ {product.price * product.amount}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <StyledSummaryContainer>
          <div>
            <p>Subtotal : NT$ {subtotal}</p>
            <p>Delivery : NT$ {delivery}</p>
            <p className="grandTotal">Grand Total : NT$ {total}</p>
          </div>
        </StyledSummaryContainer>
      </div>
    </StyledItemContainer>
  );
};

export default OrderHistoryItem;
