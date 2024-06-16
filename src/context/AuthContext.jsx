import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchUserInfo } from "../api/Auth";

export const AuthContext = createContext();
const token = localStorage.getItem("accessToken");

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchUserInfo().then((data) => setUserInfo(data));
    }
  }, [token]);

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
    fetchUserInfo().then((data) => setUserInfo(data));
  };

  const logout = async () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserInfo(null);
    navigate("/"); // 로그인 페이지로 이동
    if (userInfo) {
      Swal.fire(
        "Logout!",
        `${userInfo.nickname}님 로그아웃되었습니다.`,
        "success"
      );
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
