import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/root";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ErrorPage } from "./pages/ErrorPage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CartPage } from "./pages/CartPage";
import { LoginPage } from "./pages/LoginPage";
import CartProvider from "./context/CartContext";
import { createTheme, ThemeProvider } from "@mui/material";
import { SignupPage } from "./pages/SignupPage";
import { PaymentPage } from "./pages/PaymentPage";
import { OrderPage } from "./pages/OrderPage";
import { MemberInfoPage } from "./pages/MemberInfoPage";
import "./App.css";
import { OrderHistoryPage } from "./pages/OrderHistoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "products/:productId", element: <ProductDetailPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "payment", element: <PaymentPage /> },
      { path: "order", element: <OrderPage /> },
      { path: "member", element: <MemberInfoPage /> },
      { path: "orderhistory", element: <OrderHistoryPage /> },
    ],
  },
]);

const theme = createTheme({
  palette: {
    primary: { main: "#3072ff" },
  },
});

const App = () => {
  return (
    <CartProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </CartProvider>
  );
};

export default App;
