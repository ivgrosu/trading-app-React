import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import StockOverviewPage, {
  action as deladdAction,
  loader as stockListLoader,
} from "./pages/StockOverviewPage";
import StockDetailPage, {
  loader as chartDataLoader,
} from "./pages/StockDetailPage";
import RootPage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import SignupPage, { action as signupAction } from "./pages/SignupPage";
import LoginPage, { action as loginAction } from "./pages/LoginPage";
import { action as logoutAction } from "./components/Logout";
import { uidLoader } from "./utils/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: uidLoader,
    children: [
      {
        path: "/",
        element: <StockOverviewPage />,
        loader: stockListLoader,
        action: deladdAction,
      },
      {
        path: "/detail/:symbol",
        element: <StockDetailPage />,
        loader: chartDataLoader,
      },

      { path: "/signup", element: <SignupPage />, action: signupAction },
      { path: "/login", element: <LoginPage />, action: loginAction },
      { path: "/logout", action: logoutAction },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
