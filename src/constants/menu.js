import { Box, DollarSign, UserPlus } from "react-feather";

export const MENUITEMS = [
  {
    title: "Products",
    icon: Box,
    type: "sub",
    active: false,
    view: "user",
    children: [
      { path: "/products/all", title: "Products", type: "link", view: "user" },
      {
        path: "/products/add-product",
        title: "Add Product",
        type: "link",
        view: "user",
      },
    ],
  },
  {
    title: "Cards",
    icon: Box,
    type: "sub",
    active: false,
    view: "user",
    children: [
      { path: "/cards/all", title: "Cards", type: "link", view: "user" },
      {
        path: "/cards/add-card",
        title: "Add Card",
        type: "link",
        view: "admin",
      },
    ],
  },
  {
    title: "Sales",
    icon: DollarSign,
    type: "sub",
    active: false,
    view: "user",
    children: [
      { path: "/sales/orders", title: "Orders", type: "link", view: "user" },
    ],
  },
  {
    title: "Store",
    icon: UserPlus,
    type: "sub",
    active: false,
    view: "user",
    children: [
      {
        path: "/store/list-store",
        title: "Store List",
        type: "link",
        view: "user",
      },
      {
        path: "/store/create-store",
        title: "Create Store",
        type: "link",
        view: "user",
      },
    ],
  },
  {
    title: "Transactions",
    icon: UserPlus,
    type: "sub",
    active: false,
    view: "user",
    children: [
      {
        path: "/transactions",
        title: "Transactions",
        type: "link",
        view: "admin",
      },
      {
        path: "/transactions/withdrawals",
        title: "Withdrawals",
        type: "link",
        view: "seller",
      },
      {
        path: "/transactions/withdraw-form",
        title: "Withdraw Form",
        type: "link",
        view: "seller",
      },
    ],
  },
  {
    title: "History",
    icon: UserPlus,
    type: "sub",
    active: false,
    view: "admin",
    children: [
      { path: "/history", title: "History", type: "link", view: "admin" },
    ],
  },
  {
    title: "Category",
    icon: UserPlus,
    type: "sub",
    active: false,
    view: "user",
    children: [
      {
        path: "/category/all",
        title: "Categories",
        type: "link",
        view: "user",
      },
      {
        path: "/category/add",
        title: "Create Category",
        type: "link",
        view: "user",
      },
      {
        path: "/category/request",
        title: "Request Categories",
        type: "link",
        view: "user",
      },
    ],
  },
  {
    title: "Users",
    icon: UserPlus,
    type: "sub",
    active: false,
    view: "admin",
    children: [
      {
        path: "/users/list-user",
        title: "User List",
        type: "link",
        view: "admin",
      },
      {
        path: "/users/create-user",
        title: "Create User",
        type: "link",
        view: "admin",
      },
    ],
  },
];
