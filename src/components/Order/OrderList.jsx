import OrderItem from "./OrderItem";

const OrderList = ({ orderItems }) => {
  return (
    <div>
      {orderItems.map((item) => {
        if (item) {
          return <OrderItem item={item} key={item.id} />;
        } else return <></>;
      })}
    </div>
  );
};
export default OrderList;
