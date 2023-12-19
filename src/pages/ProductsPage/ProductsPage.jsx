import { StyledContainer } from "../../components/common";
import { styled } from "styled-components";
import { ProductList, ProductForm } from "../../components/products";
import { useState, useEffect } from "react";
import { getProductsApi, getBrandsApi } from "../../api";

const StyledProduct = styled.section`
  padding-top: 64px;
  padding-bottom: 64px;

  .products__title {
    padding-bottom: 32px;
    font-size: 32px;
    text-align: center;
  }
`;

const ProductsPage = () => {
  // window scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // products
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const initalSettings = async () => {
      try {
        const productData = await getProductsApi();
        setProducts(productData);
        const brandData = await getBrandsApi();
        setBrands(brandData);
        setCategories([
          ...new Set(productData.map((product) => product.category)),
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    initalSettings();
  }, []);

  // @todo 1. remove brandOptions and categoryOptions
  const categoryOptions = ["Shampoo", "Conditioner", "Pomade", "Hair oil"];

  //@todo form select brand
  const handleSelectBrand = (event) => {
    console.log("brand select = ", event.target.value);
  };
  //@todo form select category
  const handleSelectCategory = (event) => {
    console.log("category select = ", event.target.value);
  };
  //@todo form search
  const handleSearch = (event) => {
    console.log("search  = ", event.target.value);
  };

  return (
    <main>
      <StyledProduct>
        <StyledContainer>
          <div className="products__title">
            <h2>Products</h2>
          </div>
          <ProductForm
            onSelectBrand={handleSelectBrand}
            onSelectCategory={handleSelectCategory}
            onSearch={handleSearch}
            brandOptions={brands.map((brand) => brand.brandName)}
            categoryOptions={categories}
          />
          <ProductList products={products}></ProductList>
        </StyledContainer>
      </StyledProduct>
    </main>
  );
};

export default ProductsPage;
