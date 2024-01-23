import { StyledContainer, StyledLink } from "../../components/common";
import { styled } from "styled-components";
import { ProductList, ProductForm } from "../../components/products";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import {
  getProductsApi,
  getBrandsApi,
  filterProductsApi,
  nextPageProductsApi,
} from "../../api";

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
  const [route, setRoute] = useState("/products");
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState({});
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    const initalSettings = async () => {
      try {
        const productData = await getProductsApi();
        setProducts(productData.data);
        setPagination(productData.pagination);
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
    const data = await filterProductsApi(filter);
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
      setPagination(data.pagination);
      setRoute(data.route);
    });
  };

  const handleSelectCategory = (event) => {
    const category = event.target.value;
    const newFilter = { ...filter, category: category };
    setFilter(newFilter);
    getFilteredProducts(newFilter).then((data) => {
      setProducts(data.data);
      setPagination(data.pagination);
      setRoute(data.route);
    });
  };

  const handleSearch = (event) => {
    filterProductsApi({ q: event.target.value }).then((data) => {
      setProducts(data.data);
      setPagination(data.pagination);
      setRoute(data.route);
    });
  };

  const handleMore = (event) => {
    nextPageProductsApi({ route: route, page: pagination.nextPage }).then(
      (data) => {
        setProducts([...products, ...data.data]);
        setPagination(data.pagination);
      }
    );
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
          {pagination.nextPage ? (
            <Button
              variant="contained"
              component={StyledLink}
              onClick={handleMore}
            >
              More
            </Button>
          ) : (
            <></>
          )}
        </StyledContainer>
      </StyledProduct>
    </main>
  );
};

export default ProductsPage;
