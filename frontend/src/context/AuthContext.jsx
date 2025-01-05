import { createContext, useState, useEffect } from "react";
import jwt from "jsonwebtoken";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [isAuthentication, setIsAuthentication] = useState(localStorage.getItem("Authorizate") === "true");
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const decodeToken = (token) => {
    try {
      return jwt.decode(token);
    } catch (error) {
      return null;
    }
  };

  const checkTokenValidity = (token) => {
    if (!token) return false;
    const decoded = decodeToken(token);
    return decoded ? Date.now() < decoded.exp * 1000 : false;
  };

  const handleAuthentication = (status) => {
    setIsAuthentication(status);
    localStorage.setItem("Authorizate", status.toString());
  };

  const setAuthToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const clearAuthData = () => {
    setToken(null);
    setIsAuthentication(false);
    localStorage.removeItem("token");
    localStorage.removeItem("Authorizate");
  };

  useEffect(() => {
    if (token && checkTokenValidity(token)) {
      handleAuthentication(true);
    } else {
      clearAuthData();
    }
  }, [token]);

  const value = {
    isAuthentication,
    token,
    setAuthToken,
    handleAuthentication,
    clearAuthData, // Optional: for manually clearing auth data from other components
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
