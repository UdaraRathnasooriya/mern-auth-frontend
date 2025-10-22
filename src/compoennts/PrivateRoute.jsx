import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../utils/Loading";

const PrivateRoute = () => {
  const { currentUser, isHydrated } = useSelector((state) => state.auth);

  // console.log("PrivateRoute - currentUser:", currentUser);
  // console.log("PrivateRoute - isHydrated:", isHydrated);

  if (!isHydrated) {
    return (
      <Loading />
    ); // Or a spinner component
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
