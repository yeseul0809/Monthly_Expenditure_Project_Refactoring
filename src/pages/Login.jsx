import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { authApi } from "../api/Auth";

const Login = () => {
  const navigate = useNavigate();

  const [id, setuserId] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi.post("/login?expiresIn=60m", {
        id,
        password,
      });
      const data = response.data;
      if (data.success) {
        login(data.accessToken);
        navigate("/home");
      } else {
        Swal.fire({
          title: "다시 입력해주세요.",
          text: "LogIn ERROR",
          icon: "warning",
          confirmButtonText: "확인",
        });
      }
    } catch (error) {
      console.error("로그인 에러", error);
      Swal.fire({
        title: "다시 입력해주세요.",
        text: "LogIn ERROR",
        icon: "warning",
        confirmButtonText: "확인",
      });
    }
  };

  return (
    <>
      <StForm onSubmit={handleLogIn}>
        <StMain>
          <p>로그인 아이디</p>
          <StInput
            type="text"
            value={id}
            onChange={(e) => setuserId(e.target.value)}
            placeholder="ID"
          />
          <p>비밀번호</p>
          <StInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <StButtonWrap>
            <StButton type="submit">로그인</StButton>
            <StButton
              onClick={() => {
                navigate(`/SignUp`);
              }}
            >
              회원가입
            </StButton>
          </StButtonWrap>
        </StMain>
      </StForm>
    </>
  );
};

export const StMain = styled.main`
  max-width: 800px;
  width: 60%;
  height: 370px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0px auto;
  justify-content: center;
  align-items: center;
  background-color: beige;
  border-radius: 20px;
  padding: 20px;

  & > p {
    font-size: 20px;
    font-weight: 700;
  }
`;

export const StForm = styled.form`
  margin-top: 50px;
`;

export const StInput = styled.input`
  background-color: lightblue;
  height: 40px;
  width: 600px;
  padding-left: 5px;
`;

export const StButton = styled.button`
  width: 80px;
  height: 40px;
  background-color: bisque;
  border-radius: 20px;
  border: 0.5px;
  font-family: "Gowun Dodum", sans-serif;
  font-size: 15px;
  cursor: pointer;
`;

export const StButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export default Login;
