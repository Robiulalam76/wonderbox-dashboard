import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../ContextAPI/AuthProvider";
import { Spinner } from "react-bootstrap";

const SellerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading === true) {
    return (
      <div
        className="d-flex justify-content-center justify-items-center h-full w-full"
        style={{ marginTop: "200px" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  } else {
    if (user?._id && user?.role === "seller") {
      return children;
    } else if (user?.role !== "seller") {
      return <Navigate to="/" state={{ from: location }} replace></Navigate>;
    }
  }
};

export default SellerRoute;
