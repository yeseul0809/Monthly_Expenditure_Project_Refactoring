import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { useAuthinterceptor } from "../api/Auth";

const Layout = () => {
  useAuthinterceptor();

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
