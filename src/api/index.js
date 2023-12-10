import axios from "axios";
const baseUrl = process.env.REACT_APP_API_BASE_URL;
const getArrayDataApi = async (route) => {
  return axios
    .get(`${baseUrl}/${route}`)
    .then((response) => {
      // 確保 response.data 是一個陣列
      if (Array.isArray(response.data)) {
        return response.data;
      } else {
        console.error("Error: received data is not an array", response.data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const getOneDataApi = async (route) => {
  return axios
    .get(`${baseUrl}/${route}`)
    .then((response) => {
      // 確保 response.data 是一個物件
      if (typeof response.data === "object") {
        return response.data;
      } else {
        console.error("type error", response.data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const getHairstylistsApi = async () => {
  const arrayData = await getArrayDataApi("hairstylists");
  return arrayData;
};

const getProductsApi = async () => {
  const arrayData = await getArrayDataApi("products");
  return arrayData;
};

const getBrandsApi = async () => {
  const arrayData = await getArrayDataApi("brands");
  return arrayData;
};

const getProductAndBrandApi = async (productId) => {
  const data = await getOneDataApi(`products/${productId}?_expand=brand`);
  return data;
};

const loginApi = (email, password) => {
  axios
    .post(`${baseUrl}/members/login`, {
      email: email,
      password: password,
    })
    .then((response) => {
      const token = response.data.token;
      document.cookie = `token=${token}`;
      window.location.href = "/";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const signupApi = (username, email, password) => {
  axios
    .post(`${baseUrl}/members/signup`, {
      username: username,
      email: email,
      password: password,
    })
    .then((response) => {
      window.location.href = "/login";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export {
  getHairstylistsApi,
  getProductsApi,
  getBrandsApi,
  getProductAndBrandApi,
  loginApi,
  signupApi,
};
