import { StyledContainer } from "../../components/common";
import { styled } from "styled-components";
import { ProductList, ProductForm } from "../../components/products";
import { useState, useEffect } from "react";
import { getProductsApi, getBrandsApi, getProductsQueryApi } from "../../api";

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
  const [filter, setFilter] = useState({});

  useEffect(() => {
    const initalSettings = async () => {
      try {
        const productData = await getProductsApi();
        setProducts(productData.data);
        const brandData = await getBrandsApi();
        setBrands(brandData.data);
        setCategories([
          ...new Set(productData.data.map((product) => product.category)),
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    initalSettings();
  }, []);

  async function getFilteredProducts(filter) {
    const data = await getProductsQueryApi(filter);
    return data;
  }

  const handleSelectBrand = (event) => {
    function getBrandId(b) {
      for (const brand of brands) {
        if (brand.brandName === b) return brand.id;
      }
    }
    const brandId = getBrandId(event.target.value);
    const newFilter = { ...filter, brandId: brandId };
    setFilter(newFilter);
    getFilteredProducts(newFilter).then((data) => {
      setProducts(data.data);
    });
  };

  const handleSelectCategory = (event) => {
    const category = event.target.value;
    const newFilter = { ...filter, category: category };
    setFilter(newFilter);
    getFilteredProducts(newFilter).then((data) => {
      setProducts(data.data);
    });
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
