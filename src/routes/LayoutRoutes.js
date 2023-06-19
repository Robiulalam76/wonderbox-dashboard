import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import App from "../components/app";
import Datatable from "../components/common/datatable";
import Dashboard from "../components/dashboard";
import Invoice from "../components/invoice";
import Orders from "../components/sales/orders";
import Transactionsales from "../components/sales/transactions-sales";
import Profile from "../components/settings/profile";
import Create_Store from "../components/users/create-store";
import Createuser from "../components/users/create-user";
import List_store from "../components/users/list-store";
import Listuser from "../components/users/list-user";
import AddProduct from "../components/products/AddProduct";
import Products from "../components/products/Products";
import Cards from "../components/Cards/Cards";
import AddCard from "../components/Cards/AddCard";
import AllCategory from "../components/category/AllCategory";
import AddCategory from "../components/category/AddCategory";
import CategoryRequest from "../components/category/CategoryRequest";
import ProductReview from "../components/products/ProductReview";
import History from "../components/History/History";
import CardDetails from "../components/Cards/CardDetails";
import TransactionList from "../components/Transactions/TransactionList";
import TransactionDetails from "../components/Transactions/TransactionDetails";

const LayoutRoutes = () => {
  return (
    <Fragment>
      <Routes>
        <Route element={<App />}>
          <Route
            path={`${process.env.PUBLIC_URL}/dashboard`}
            element={<Dashboard />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/products/all`}
            element={<Products />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/products/add-product`}
            element={<AddProduct />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/products/:id/reviews`}
            element={<ProductReview />}
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
          <Route
            path={`${process.env.PUBLIC_URL}/cards/:id`}
            element={<CardDetails />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/sales/orders`}
            element={<Orders />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/sales/transactions`}
            element={<Transactionsales />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/users/list-user`}
            element={<Listuser />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/store/list-store`}
            element={<List_store />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/store/create-store`}
            element={<Create_Store />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/transactions`}
            element={<TransactionList />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/transactions/:id`}
            element={<TransactionDetails />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/history`}
            element={<History />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/category/all`}
            element={<AllCategory />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/category/add`}
            element={<AddCategory />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/category/request`}
            element={<CategoryRequest />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/users/create-user`}
            element={<Createuser />}
          />

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
