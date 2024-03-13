import MasterLayout from "./components/theme/masterLayout";
import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import { adminRoutes, publicRoutes } from "./utils/router";
import adminLayout from "components/theme/adminLayout";
const RouterCustom = () => {
  return (
    <Routes>
      {publicRoutes.map((route, index) => {
        const Layout = route.layout === null ? Fragment : MasterLayout;
        const Page = route.component;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                <Page />
              </Layout>
            }
          />
        );
      })}
      {adminRoutes.map((route, index) => {
        const Layout = adminLayout;
        const Page = route.component;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                <Page />
              </Layout>
            }
          />
        );
      })}
    </Routes>
  );
};
export default RouterCustom;
