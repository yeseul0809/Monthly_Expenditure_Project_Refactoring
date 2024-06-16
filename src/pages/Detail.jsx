import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DetailFetchData, deleteData, upadateData } from "../api/Expenses";
import { useUserInfo } from "../hooks/useUserInfo";

const Detail = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();

  const dateRef = useRef("");
  const categoryRef = useRef("");
  const priceRef = useRef("");
  const descriptionRef = useRef("");

  const { data: logInUser } = useUserInfo();

  // useQuery 사용하여 데이터 가져오기
  const {
    data: selectedExpense,
    isLoading,
    error,
  } = useQuery({ queryKey: ["expenses", id], queryFn: DetailFetchData });

  // 지출내역 수정
  const modifyMutation = useMutation({
    mutationFn: upadateData,
    onSuccess: () => {
      queryClient.invalidateQueries("expenses");
      Swal.fire("수정사항이 반영되었습니다.", "", "success");
      navigate(`/home`);
    },
  });

  // 지출내역 삭제
  const deleteMutation = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries("expenses");
      Swal.fire("지출내역이 삭제되었습니다.", "", "success");
      navigate(`/home`);
    },
  });

  const modifyHandler = (e) => {
    e.preventDefault();

    if (selectedExpense.createdBy !== logInUser.id) {
      Swal.fire({
        title: "수정권한이 없습니다.",
        text: "ACEESS ERROR",
        icon: "warning",
        confirmButtonText: "확인",
      });
      return;
    }

    const modifiedData = {
      id: id,
      date: dateRef.current.value,
      category: categoryRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
      createdBy: selectedExpense.createdBy,
    };
    modifyMutation.mutate(modifiedData);
  };

  const deleteHandler = (e) => {
    e.preventDefault();

    if (selectedExpense.createdBy !== logInUser.id) {
      Swal.fire({
        title: "삭제권한이 없습니다.",
        text: "ACEESS ERROR",
        icon: "warning",
        confirmButtonText: "확인",
      });
      return;
    }

    deleteMutation.mutate(id);
  };

  // 넘어오는 id 가 달라질때마다 참조 바꾸기
  useEffect(() => {
    if (selectedExpense) {
      dateRef.current.value = selectedExpense.date;
      categoryRef.current.value = selectedExpense.category;
      priceRef.current.value = selectedExpense.price;
      descriptionRef.current.value = selectedExpense.description;
    }
  }, [selectedExpense]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <StDetailWrap>
        <StDetailGroup>
          <label htmlFor="date">Date</label>
          <StDetailInput
            type="date"
            id="date"
            ref={dateRef}
            placeholder="YYYY-MM-DD"
          />
        </StDetailGroup>
        <StDetailGroup>
          <label htmlFor="category">Category</label>
          <StDetailInput
            type="text"
            id="category"
            ref={categoryRef}
            placeholder="지출항목"
          />
        </StDetailGroup>
        <StDetailGroup>
          <label htmlFor="price">Price</label>
          <StDetailInput
            type="number"
            id="price"
            ref={priceRef}
            placeholder="지출금액"
          />
        </StDetailGroup>
        <StDetailGroup>
          <label htmlFor="description">Description</label>
          <StDetailInput
            type="text"
            id="description"
            ref={descriptionRef}
            placeholder="지출내용"
          />
        </StDetailGroup>
        <StButtonWrap>
          <StDetailButton onClick={modifyHandler}>Modify</StDetailButton>
          <StDetailButton $backgroundColor="#e98282" onClick={deleteHandler}>
            Delete
          </StDetailButton>
          <StDetailButton
            $backgroundColor="#4c9b6ee6"
            onClick={() => {
              navigate(`/home`);
            }}
          >
            Back
          </StDetailButton>
        </StButtonWrap>
      </StDetailWrap>
    </>
  );
};

export default Detail;

const StDetailWrap = styled.div`
  max-width: 800px;
  margin: 0px auto;
  padding: 20px;
  background-color: rgb(106 185 172 / 53%);
  border-radius: 16px;
`;

const StDetailGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  & > label {
    margin-bottom: 5px;
    font-size: 14px;
    color: rgb(51, 51, 51);
    text-align: left;
  }
`;

const StDetailInput = styled.input`
  padding: 10px;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 4px;
  font-size: 16px;
  font-family: "Gowun Dodum", sans-serif;
`;

const StButtonWrap = styled.div`
  display: flex;
  gap: 10px;
  padding-top: 8px;
`;

const StDetailButton = styled.button`
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out 0s;
  font-family: "Gowun Dodum", sans-serif;
  background-color: ${(props) => props.$backgroundColor || "#b85b8b"};
`;
