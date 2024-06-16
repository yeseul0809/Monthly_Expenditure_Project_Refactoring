import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import { Mypage } from "../pages/Mypage";
import Layout from "../components/Layout";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/" />;
};

const PublicRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? <Element {...rest} /> : <Navigate to="/mypage" />;
};

const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<PublicRoute element={SignUp} />} />
          <Route element={<Layout />}>
            <Route path="/home" element={<PrivateRoute element={Home} />} />
            <Route path="/mypage" element={<PrivateRoute element={Mypage} />} />
            <Route
              path="/detail/:id"
              element={<PrivateRoute element={Detail} />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
