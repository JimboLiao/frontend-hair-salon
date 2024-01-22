import axios from "axios";
import Cookies from "js-cookie";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getArrayDataApi = async (route) => {
  return axios
    .get(`${baseUrl}/${route}`)
    .then((response) => {
      console.log("response = ", response);
      // 確保 response.data 是一個陣列
      if (Array.isArray(response.data.data)) {
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
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

const getDataWithAuthApi = async (route) => {
  const token = Cookies.get("token");
  if (!token) return null;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .get(`${baseUrl}/${route}`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

const createDataWithAuthApi = async (route, data) => {
  const token = Cookies.get("token");
  if (!token) return null;

  const requestBody = data;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .post(`${baseUrl}/${route}`, requestBody, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

const updateDataWithAuthApi = async (route, data) => {
  const token = Cookies.get("token");
  if (!token) return null;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .put(`${baseUrl}/${route}`, data, config)
    .then((response) => {
      return response.data;
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

const signupApi = (username, email, password) => {
  axios
    .post(`${baseUrl}/members/signup`, {
      username: username,
      email: email,
      password: password,
    })
    .then((response) => {})
    .catch((error) => {
      console.error("Error:", error);
    });
};

const getMemberApi = async () => {
  const id = Cookies.get("id");
  if (!id) return null;
  const data = await getDataWithAuthApi(`members/${id}/profile`);
  return data;
};

const updateMemberApi = async (data) => {
  const id = Cookies.get("id");
  if (!id) return null;
  const result = await updateDataWithAuthApi(`members/${id}/`, data);
  return result;
};

const createOrderApi = async (data) => {
  const result = await createDataWithAuthApi(`orders/`, data);
  return result;
};

const getOrdersWithProductsApi = async () => {
  const result = await getDataWithAuthApi(`orders/?_embed=products`);
  return result;
};

const getProductsOfBrandApi = async (brandId) => {
  const result = await getArrayDataApi(`products/?brandId=${brandId}`);
  return result;
};

export {
  getHairstylistsApi,
  getProductsApi,
  getBrandsApi,
  getProductAndBrandApi,
  signupApi,
  getMemberApi,
  updateMemberApi,
  createOrderApi,
  getOrdersWithProductsApi,
  getProductsOfBrandApi,
};
