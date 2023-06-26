import React from "react";
import Header from "../components/common/header_components/Header";
import Sidebar from "../components/common/SidebarComponents/Sidebar";
import RightSidebar from "../components/common/right-sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/common/footer";
import PrivateRoute from "../routes/PrivateRoute";
const Main = () => {
  const initialState = {
    ltr: true,
    divName: "RTL",
  };

  const [side, setSide] = useState(initialState);

  const ChangeRtl = (divName) => {
    if (divName === "RTL") {
      document.body.classList.add("rtl");
      setSide({ divName: "LTR" });
    } else {
      document.body.classList.remove("rtl");
      setSide({ divName: "RTL" });
    }
  };
  return (
    <PrivateRoute>
      <div className="page-wrapper">
        <Header />
        <div className="page-body-wrapper">
          <Sidebar />
          <RightSidebar />
          <div className="page-body">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
      <div
        className="btn-light custom-theme"
        onClick={() => ChangeRtl(side.divName)}
      >
        {side.divName}
      </div>
    </PrivateRoute>
  );
};

export default Main;
