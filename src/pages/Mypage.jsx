import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/Auth";
import { useUserInfo } from "../hooks/useUserInfo";

// 닉네임, 프로필 사진 변경 UI
// 1. useEffect 조회
// 2. form 태그로 유저정보 수정
// -> 둘 다 로그인 했다는 인증정보 (accessToken) 필요.

export const Mypage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [newNickname, setNewNickname] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const queryClient = useQueryClient();

  // 커스텀 훅 사용
  const { data: userInfo, error } = useUserInfo((error) => {
    Swal.fire("사용자 정보를 가져오는 데 실패했습니다.", "", "error");
  });

  const updatemutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries("userInfo");
      Swal.fire("수정사항이 반영되었습니다!", "", "success");
      setNewNickname("");
      setImgFile(null);
      setImgPreview(null);
      navigate("/home");
    },
    onError: (error) => {
      console.error("Failed to update profile:", error);
      Swal.fire(
        error.response.data.message,
        "프로필 업데이트에 실패했습니다.",
        "error"
      );
    },
  });

  const handleInfoChange = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nickname", newNickname);

    if (imgFile) {
      formData.append("avatar", imgFile);
    }

    updatemutation.mutate(formData);
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setImgFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImgPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      Swal.fire("로그인이 필요합니다.", "", "warning");
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (error) {
    return <div>사용자 정보를 가져오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <>
      <StyledProfileModifyWrap>
        <form onSubmit={handleInfoChange}>
          <StyledModifyWrap>
            <label>NickName</label>
            <input
              type="text"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              placeholder="새 닉네임을 입력해주세요"
            />
          </StyledModifyWrap>
          <StyledModifyWrap>
            <label>Profile Image</label>
            <input type="file" onChange={handleImgChange} />
            {imgPreview && (
              <img src={imgPreview} alt="프로필 이미지 미리보기" />
            )}
          </StyledModifyWrap>
          <StUpdateButton type="submit">프로필 업데이트</StUpdateButton>
        </form>
      </StyledProfileModifyWrap>
    </>
  );
};

const StUpdateButton = styled.button`
  background-color: #ffdadab3;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  padding: 10px 20px;
  font-family: "Gowun Dodum", sans-serif;
  font-weight: 400;
  color: #827575;
  cursor: pointer;
  &:hover {
    background-color: rgb(106 185 172 / 53%);
    color: #f27474;
  }
`;

const StyledProfileModifyWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  /* background-color: rgba(106, 185, 172, 0.53); */
  border-radius: 16px;
  font-family: "Gowun Dodum", sans-serif;
  width: 600px;
  border: solid rgb(106 185 172 / 53%) 2px;
`;

const StyledModifyWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;

  & > label {
    font-size: 25px;
    margin-bottom: 10px;
    font-weight: 600;
  }

  & > input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  & > img {
    margin-top: 10px;
    max-width: 100%;
    border-radius: 8px;
  }
`;
