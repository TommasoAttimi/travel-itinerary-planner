import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
  });

  useEffect(() => {
    if (authState.token) {
      setAuthToken(authState.token);
      loadUser();
    } else {
      setAuthState({
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      });
    }
  }, []);

  const loadUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/auth");
      setAuthState({
        ...authState,
        isAuthenticated: true,
        loading: false,
        user: res.data,
      });
    } catch (err) {
      console.error(
        "Error loading user:",
        err.response ? err.response.data : err.message
      );
      setAuthState({
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      });
    }
  };

  const login = async (formData) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData
      );
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setAuthToken(res.data.token);
        await loadUser();
        return true;
      } else {
        console.error("No token found in login response");
        return false;
      }
    } catch (err) {
      console.error(
        "Error during login:",
        err.response ? err.response.data : err.message
      );
      return false;
    }
  };

  const register = async (formData) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData
      );
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setAuthToken(res.data.token);
        await loadUser();
        return true;
      } else {
        console.error("No token found in register response");
        return false;
      }
    } catch (err) {
      console.error(
        "Error during registration:",
        err.response ? err.response.data : err.message
      );
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setAuthState({
      token: null,
      isAuthenticated: false,
      loading: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
