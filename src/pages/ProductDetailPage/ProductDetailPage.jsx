import { useParams } from "react-router-dom";
import {
  StyledContainer,
  StyledRow,
  StyledColumn,
  ProductImage,
  StyledLink,
} from "../../components/common";
import { styled } from "styled-components";
import { ProductInfo, ProductIntro } from "../../components/products";
import { CartContext } from "../../context/CartContext";
import { useState, useEffect, useContext } from "react";
import { Button } from "@mui/material";
import { getProductAndBrandApi } from "../../api";

const StyledProductDetail = styled.section`
  padding-top: 64px;
  padding-bottom: 64px;

  .product-info {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const ProductDetailPage = () => {
  // window scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // products
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [brand, setBrand] = useState(null);
  useEffect(() => {
    const getAndSetProductAndBrand = async () => {
      const data = await getProductAndBrandApi(productId);
      setProduct(data.data.product);
      setBrand(data.data.brand);
    };
    getAndSetProductAndBrand();
  }, [productId]);

  // cart
  const { cart, setCart } = useContext(CartContext);
  const [amount, setAmount] = useState(0);
  const handleAddToCart = () => {
    // Check if the product is already in the cart
    const cartIndex = cart.findIndex((item) => item.id === product.id);
    // Not in the cart
    if (cartIndex === -1) {
      setCart([...cart, { amount: amount, isPaid: false, ...product }]);
    } else {
      // Already in the cart
      let newCart = [...cart];
      newCart[cartIndex].amount = amount;
      setCart(newCart);
    }
  };

  /// product not found
  if (product === null)
    return (
      <StyledContainer>
        <p>product not found... </p>
        <br />
        <Button variant="contained" component={StyledLink} to="/">
          Home
        </Button>
      </StyledContainer>
    );
  /// render the product detail
  else {
    return (
      <main>
        <StyledProductDetail>
          <StyledContainer>
            <StyledRow>
              <StyledColumn $num={6}>
                <ProductImage $backgroundImageUrl={product.imgUrl} />
              </StyledColumn>

              <StyledColumn $num={6}>
                <ProductInfo
                  product={product}
                  onAddToCart={handleAddToCart}
                  onAmountChange={setAmount}
                />
              </StyledColumn>
            </StyledRow>
            {brand === null ? (
              <></>
            ) : (
              <ProductIntro
                title={brand.brandName}
                detail={brand.description}
              />
            )}
            <ProductIntro title={product.productName} detail={product.detail} />
          </StyledContainer>
        </StyledProductDetail>
      </main>
    );
  }
};

export default ProductDetailPage;
