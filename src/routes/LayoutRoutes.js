import React, { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import App from "../components/app";
import Datatable from "../components/common/datatable";
import Createcoupons from "../components/coupons/create-coupons";
import ListCoupons from "../components/coupons/list-coupons";
import Dashboard from "../components/dashboard";
import Invoice from "../components/invoice";
import Rates from "../components/localization/rates";
import Taxes from "../components/localization/taxes";
import Translations from "../components/localization/translations";
import Media from "../components/media/media";
import Createmenu from "../components/menus/create-menu";
import Listmenu from "../components/menus/list-menu";
import Createpage from "../components/pages/create-page";
import ListPages from "../components/pages/list-page";
import Digitaladdpro from "../components/products/digital/digital-add-pro";
import Digitalcategory from "../components/products/digital/digital-category";
import Digitalprolist from "../components/products/digital/digital-pro-list";
import Digitalsubcategory from "../components/products/digital/digital-sub-category";
import Addproduct from "../components/products/physical/add-product";
import Category from "../components/products/physical/category";
import Productdetail from "../components/products/physical/product-detail";
import Productlist from "../components/products/physical/product-list";
import Subcategory from "../components/products/physical/sub-category";
import Reports from "../components/reports/report";
import Orders from "../components/sales/orders";
import Transactionsales from "../components/sales/transactions-sales";
import Profile from "../components/settings/profile";
import Create_Store from "../components/users/create-store";
import Createuser from "../components/users/create-user";
import List_store from "../components/users/list-store";
import Listuser from "../components/users/list-user";
import Createvendors from "../components/vendors/create.vendors";
import Listvendors from "../components/vendors/list-vendors";
import AddProduct from "../components/products/AddProduct";
import Products from "../components/products/Products";
import Cards from "../components/Cards/Cards";
import AddCard from "../components/Cards/AddCard";

const LayoutRoutes = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const usr = localStorage.getItem("user-id");
    fetch(`http://localhost:5000/api/user/${usr}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <Fragment>
      <Routes>
        <Route element={<App />}>
          <Route
            path={`${process.env.PUBLIC_URL}/dashboard`}
            element={<Dashboard />}
          />


          <Route
            path={`${process.env.PUBLIC_URL}/products/add-product`}
            element={<AddProduct />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/products/all`}
            element={<Products />}
          />


          {/* // -----------cards----------- */}
          <Route
            path={`${process.env.PUBLIC_URL}/cards/all`}
            element={<Cards />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/cards/add-card`}
            element={<AddCard />}
          />


          {/* {user && user.role === "admin" && (
            <Route
              path={`${process.env.PUBLIC_URL}/products/physical/category`}
              element={<Category />}
            />
          )}
          {user && user.role === "admin" && (
            <Route
              path={`${process.env.PUBLIC_URL}/products/physical/sub-category`}
              element={<Subcategory />}
            />
          )}
          {user && user.role === "admin" && (
            <Route
              path={`${process.env.PUBLIC_URL}/products/physical/product-list`}
              element={<Productlist />}
            />
          )}
          <Route
            path={`${process.env.PUBLIC_URL}/products/physical/product-detail/:id`}
            element={<Productdetail />}
          />

          {user && user.role === "seller" || user.role === "admin" && (
            <Route
              path={`${process.env.PUBLIC_URL}/products/physical/add-product`}
              element={<Addproduct />}
            />
          )}
          {user && user.role === "admin" && (
            <Route
              path={`${process.env.PUBLIC_URL}/products/digital/digital-category`}
              element={<Digitalcategory />}
            />
          )}
          {user && user.role === "seller" && (
            <Route
              path={`${process.env.PUBLIC_URL}/products/digital/digital-sub-category`}
              element={<Digitalsubcategory />}
            />
          )}
          <Route
            path={`${process.env.PUBLIC_URL}/products/digital/digital-product-list`}
            element={<Digitalprolist />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/digital/digital-add-product`}
            element={<Digitaladdpro />}
          /> */}

          <Route
            path={`${process.env.PUBLIC_URL}/sales/orders`}
            element={<Orders />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/sales/transactions`}
            element={<Transactionsales />}
          />

          {/* <Route
            path={`${process.env.PUBLIC_URL}/coupons/list-coupons`}
            element={<ListCoupons />}
          /> */}
          {/* <Route
            path={`${process.env.PUBLIC_URL}/coupons/create-coupons`}
            element={<Createcoupons />}
          /> */}
          {/* {user && user.role === "admin" && (
            <Route
              path={`${process.env.PUBLIC_URL}/pages/list-page`}
              element={<ListPages />}
            />
          )} */}
          {/* <Route
            path={`${process.env.PUBLIC_URL}/pages/create-page`}
            element={<Createpage />}
          /> */}

          {/* <Route path={`${process.env.PUBLIC_URL}/media`} element={<Media />} /> */}

          {/* <Route
            path={`${process.env.PUBLIC_URL}/menus/list-menu`}
            element={<Listmenu />}
          /> */}
          {/* <Route
            path={`${process.env.PUBLIC_URL}/menus/create-menu`}
            element={<Createmenu />}
          /> */}
          {user && user.role === "admin" && (
            <Route
              path={`${process.env.PUBLIC_URL}/users/list-user`}
              element={<Listuser />}
            />
          )}



          {user && user.role === "admin" || user.role === "seller" && (
            <Route
              path={`${process.env.PUBLIC_URL}/store/list-store`}
              element={<List_store />}
            />
          )}

          {user && user.role === "seller" && (
            <Route
              path={`${process.env.PUBLIC_URL}/store/create-store`}
              element={<Create_Store />}
            />
          )}



          {user && user.role === "admin" && (
            <Route
              path={`${process.env.PUBLIC_URL}/users/create-user`}
              element={<Createuser />}
            />
          )}
          {/* 
          <Route
            path={`${process.env.PUBLIC_URL}/vendors/list_vendors`}
            element={<Listvendors />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/vendors/create-vendors`}
            element={<Createvendors />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/localization/transactions`}
            element={<Translations />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/localization/currency-rates`}
            element={<Rates />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/localization/taxes`}
            element={<Taxes />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/reports/report`}
            element={<Reports />}
          /> */}

          <Route
            path={`${process.env.PUBLIC_URL}/settings/profile`}
            element={<Profile />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/invoice`}
            element={<Invoice />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/data-table`}
            element={<Datatable />}
          />
        </Route>
      </Routes>
    </Fragment>
  );
};

export default LayoutRoutes;
