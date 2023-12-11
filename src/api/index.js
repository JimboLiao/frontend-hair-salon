import axios from "axios";
import Cookies from "js-cookie";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const setCookies = (token, id) => {
  Cookies.set("token", token, { expires: 1 });
  Cookies.set("id", id);
};

const removeCookies = () => {
  Cookies.remove("token");
  Cookies.remove("id");
};

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

const getOneDataWithAuthApi = async (route) => {
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

const loginApi = (email, password) => {
  axios
    .post(`${baseUrl}/members/login`, {
      email: email,
      password: password,
    })
    .then((response) => {
      const token = response.data.token;
      const id = response.data.id;
      setCookies(token, id);
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

const getMemberApi = async () => {
  const id = Cookies.get("id");
  if (!id) return null;
  const data = await getOneDataWithAuthApi(`members/${id}/profile`);
  return data;
};

const updateMemberApi = async (data) => {
  const id = Cookies.get("id");
  if (!id) return null;
  const result = await updateDataWithAuthApi(`members/${id}/`, data);
  console.log("result:", result);
  return result;
};

export {
  getHairstylistsApi,
  getProductsApi,
  getBrandsApi,
  getProductAndBrandApi,
  loginApi,
  signupApi,
  removeCookies,
  getMemberApi,
  updateMemberApi,
};
