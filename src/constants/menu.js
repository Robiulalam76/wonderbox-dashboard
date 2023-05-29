import { useEffect, useState } from "react";
import {
  Home,
  Box,
  DollarSign,
  Tag,
  Clipboard,
  Camera,
  AlignLeft,
  UserPlus,
  Users,
  Chrome,
  BarChart,
  Settings,
  Archive,
  LogIn,
} from "react-feather";

// const [user, setUser] = useState("");

// useEffect(() => {
//   const usr = localStorage.getItem("user-id");
//   fetch(`http://localhost:5000/api/user/${usr}`)
//     .then((res) => res.json())
//     .then((data) => setUser(data));
// }, []);

export const MENUITEMS = [
  // {
  //   path: "/dashboard",
  //   title: "Dashboard",
  //   icon: Home,
  //   type: "link",
  //   badgeType: "primary",
  //   active: false,
  // },
  // {
  //   title: "Products",
  //   icon: Box,
  //   type: "sub",
  //   active: false,
  //   children: [
  //     {
  //       title: "Physical",
  //       type: "sub",
  //       active: false,
  //       children: [
  //         {
  //           path: "/products/physical/category",
  //           title: "Category",
  //           type: "link",
  //         },
  //         // {
  //         //   path: "/products/physical/sub-category",
  //         //   title: "Sub Category",
  //         //   type: "link",
  //         // },
  //         {
  //           path: "/products/physical/product-list",
  //           title: "Product List",
  //           type: "link",
  //         },
  //         // {
  //         //   path: "/products/physical/product-detail",
  //         //   title: "Product Detail",
  //         //   type: "link",
  //         // },
  //         {
  //           path: "/products/physical/add-product",
  //           title: "Add Product",
  //           type: "link",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Withdraw",
  //       type: "sub",
  //       active: false,
  //       children: [
  //         {
  //           path: "/products/digital/digital-category",
  //           title: "Withdeaw List",
  //           type: "link",
  //         },
  //         {
  //           path: "/products/digital/digital-sub-category",
  //           title: "Request Withdeaw ",
  //           type: "link",
  //         },
  //         // {
  //         //   path: "/products/digital/digital-product-list",
  //         //   title: "Product List",
  //         //   type: "link",
  //         // },
  //         // {
  //         //   path: "/products/digital/digital-add-product",
  //         //   title: "Add Product",
  //         //   type: "link",
  //         // },
  //       ],
  //     },
  //   ],
  // },
  {
    title: "Products",
    icon: Box,
    type: "sub",
    active: false,
    children: [
      { path: "/products/all", title: "Products", type: "link" },
      { path: "/products/add-product", title: "Add Product", type: "link" },
    ],
  },
  {
    title: "Cards",
    icon: Box,
    type: "sub",
    active: false,
    children: [
      { path: "/cards/all", title: "Cards", type: "link" },
      { path: "/cards/add-card", title: "Add Card", type: "link" },
    ],
  },
  {
    title: "Sales",
    icon: DollarSign,
    type: "sub",
    active: false,
    children: [
      { path: "/sales/orders", title: "Orders", type: "link" },
      // { path: "/sales/transactions", title: "allNotification", type: "link" },
    ],
  },
  // {
  //   title: "Coupons",
  //   icon: Tag,
  //   type: "sub",
  //   active: false,
  //   children: [
  //     { path: "/coupons/list-coupons", title: "List Coupons", type: "link" },
  //     {
  //       path: "/coupons/create-coupons",
  //       title: "Create Coupons",
  //       type: "link",
  //     },
  //   ],
  // },
  // {
  //   title: "Ticket ",
  //   icon: Clipboard,
  //   type: "sub",
  //   active: false,
  //   children: [
  //     { path: "/pages/list-page", title: "Ticket List", type: "link" },
  //     { path: "/pages/create-page", title: "Create Ticket", type: "link" },
  //   ],
  // },
  {
    title: "Store",
    icon: UserPlus,
    type: "sub",
    active: false,
    children: [
      { path: "/store/list-store", title: "Store List", type: "link" },
      { path: "/store/create-store", title: "Create Store", type: "link" },
    ],
  },
  {
    title: "Users",
    icon: UserPlus,
    type: "sub",
    active: false,
    children: [
      { path: "/users/list-user", title: "User List", type: "link" },
      { path: "/users/create-user", title: "Create User", type: "link" },
    ],
  },
  //   {
  //     title: "Vendors",
  //     icon: Users,
  //     type: "sub",
  //     active: false,
  //     children: [
  //       { path: "/vendors/list_vendors", title: "Vendor List", type: "link" },
  //       { path: "/vendors/create-vendors", title: "Create Vendor", type: "link" },
  //     ],
  //   },
  //   {
  //     title: "Localization",
  //     icon: Chrome,
  //     type: "sub",
  //     children: [
  //       {
  //         path: "/localization/transactions",
  //         title: "Translations",
  //         type: "link",
  //       },
  //       {
  //         path: "/localization/currency-rates",
  //         title: "Currency Rates",
  //         type: "link",
  //       },
  //       { path: "/localization/taxes", title: "Taxes", type: "link" },
  //     ],
  //   },
  //   {
  //     title: "Reports",
  //     path: "/reports/report",
  //     icon: BarChart,
  //     type: "link",
  //     active: false,
  //   },
  //   {
  //     title: "Settings",
  //     icon: Settings,
  //     type: "sub",
  //     children: [{ path: "/settings/profile", title: "Profile", type: "link" }],
  //   },
  //   {
  //     title: "Invoice",
  //     path: "/invoice",
  //     icon: Archive,
  //     type: "link",
  //     active: false,
  //   },
  //   {
  //     title: "Login",
  //     path: "/auth/login",
  //     icon: LogIn,
  //     type: "link",
  //     active: false,
  //   },
];
