import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const LoginContext = createContext();
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const setCookies = (token, id) => {
    Cookies.set("token", token, { expires: 1, path: "/" });
    Cookies.set("id", id, { path: "/" });
  };

  const removeCookies = () => {
    Cookies.remove("token");
    Cookies.remove("id");
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/members/login`, {
        email: email,
        password: password,
      });
      const { token, id } = response.data;
      setCookies(token, id);
      setIsLoggedIn(true);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const logout = () => {
    removeCookies();
    setIsLoggedIn(false);
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, login, logout, loading }}>
      {children}
    </LoginContext.Provider>
  );
};

const useLoginContext = () => useContext(LoginContext);

export { LoginProvider, useLoginContext };
