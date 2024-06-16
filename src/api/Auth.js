import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const AUTH_API = "https://moneyfulpublicpolicy.co.kr";
export const authApi = axios.create({ baseURL: AUTH_API });

// 토큰 만료시 로그아웃기능 커스텀훅
export const useAuthinterceptor = () => {
  const { logout } = useContext(AuthContext);

  authApi.interceptors.response.use(
    (response) => response,
    (error) => {
      // 토큰 만료(401) 등 인증 오류 발생하면
      if (error.response && error.response.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );
};

export const fetchUserInfo = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await authApi.get(`/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateProfile = async (formData) => {
  const token = localStorage.getItem("accessToken");
  const response = await authApi.patch(`/profile`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
