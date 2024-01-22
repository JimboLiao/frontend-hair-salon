import { styled } from "styled-components";
import { about1Img, jumbotron1Img } from "../../images";
import {
  LogoLink,
  StyledContainer,
  StyledLink,
  BackgroundImage,
} from "../../components/common";
import { ProductSummary } from "../../components/products";
import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getProductsApi, getBrandsApi } from "../../api";

const StyledJumbotron = styled.section`
  padding: 240px 0px;

  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${jumbotron1Img});

  .jumbotron__mask {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .jumbotron__title {
    font-size: 48px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const StyledAboutSummary = styled.section`
  padding-top: 64px;
  padding-bottom: 64px;

  .about-summary__title {
    padding-bottom: 32px;
    font-size: 32px;
    text-align: center;
  }
  .about-summary__content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h3 {
      padding-bottom: 20px;
      font-size: 24px;
      text-align: center;
    }
    p {
      padding-bottom: 12px;
      font-size: 16px;
      text-align: justify;
    }
  }
`;

const StyledProductSummary = styled.section`
  padding-top: 64px;
  padding-bottom: 64px;

  .products-summary__title {
    padding-bottom: 32px;
    font-size: 32px;
    text-align: center;
  }
  .products-summary__subtitle {
    padding-bottom: 20px;
    font-size: 30px;
    text-align: center;
  }
  .products-summary__footer {
    p {
      font-size: 24px;
      padding-top: 12px;
      padding-bottom: 12px;
    }
  }
`;

const HomePage = () => {
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [brandsWithProducts, setBrandsWithProducts] = useState([]);

  useEffect(() => {
    const getAndSetBrands = async () => {
      const data = await getBrandsApi();
      setBrands(data.data);
    };
    getAndSetBrands();
  }, []);

  useEffect(() => {
    const getAndSetProducts = async () => {
      const data = await getProductsApi();
      setProducts(data.data);
    };
    getAndSetProducts();
  }, []);

  useEffect(() => {
    const results = brands.map((brand) => {
      const brandProducts = products.filter(
        (product) => product.brandId === brand.id
      );
      brand.products = brandProducts;
      return brand;
    });
    setBrandsWithProducts(results);
  }, [brands, products]);

  return (
    <main>
      {/* jumbotron */}
      <StyledJumbotron>
        <div className="jumbotron__mask"></div>
        <div className="jumbotron__title">
          <LogoLink $logoWidth={"128px"} />
        </div>
      </StyledJumbotron>

      {/* about-summary */}
      <StyledAboutSummary>
        <StyledContainer>
          <div className="about-summary__title">
            <h2>About</h2>
          </div>
          <Grid container columnSpacing={2} rowSpacing={2}>
            <Grid item xs={12} md={6}>
              <div className="about-summary__content">
                <h3>Since 1999</h3>
                <p>
                  feeltc jllee jede scoot koop jssgo cdoee cxool koop jssg
                  cdoeede scode sco joo cxoolo op jssgo cdoeede sco jdie kdke
                  cxoolltc jllltc jll go cdoeedgo cdoeed
                </p>
                <div>
                  <Button
                    variant="contained"
                    component={StyledLink}
                    to="/about"
                  >
                    More
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <BackgroundImage $backgroundImageUrl={about1Img} />
            </Grid>
          </Grid>
        </StyledContainer>
      </StyledAboutSummary>

      {/* products-summary */}
      <StyledProductSummary>
        <StyledContainer>
          <div className="products-summary__title">
            <h2>Products</h2>
          </div>
          <ProductSummary brandsWithProducts={brandsWithProducts} />
          <footer className="products-summary__footer">
            <p>Find the best product for you!</p>
            <Button variant="contained" component={StyledLink} to="/products">
              Search
            </Button>
          </footer>
        </StyledContainer>
      </StyledProductSummary>
    </main>
  );
};

export default HomePage;
