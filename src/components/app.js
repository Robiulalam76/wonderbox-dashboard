import React from "react";
import { RouterProvider } from "react-router-dom";
import LayoutRoutes from "../routes/Routes";

const App = () => {
  return <RouterProvider router={LayoutRoutes} />;
};
export default App;
