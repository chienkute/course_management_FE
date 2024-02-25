import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./style/style.scss";
// import { Provider } from "react-redux";
// import store from "redux/store";
import "../node_modules/nprogress/nprogress.css";
import { ToastContainer } from "react-toastify";
import RouterCustom from "./router";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <Provider>
  <BrowserRouter>
    <RouterCustom />
    <ToastContainer autoClose={1000} />
  </BrowserRouter>
  // </Provider>
);
