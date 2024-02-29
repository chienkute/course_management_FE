import { memo } from "react";
import "./HeaderPage.scss";
import React from "react";
import { Button, Layout } from "antd";
import logo from "../../../assets/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, Badge, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateSearch } from "redux/userSlice";
const { Header } = Layout;
const HeaderPage = () => {
  const state = useSelector((state) => state.changeTheme.count);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resetSearch = () => {
    const updatedSearch = {
      search: "",
    };
    dispatch(updateSearch(updatedSearch));
  };
  return (
    <div className="header">
      <Layout>
        <Header className="header_layout">
          <Link className="header_logo" to={"/"}>
            <img src={logo} alt="" className="header_logo_image_icon" />
          </Link>
          <div className="header_item">
            <div className="header_menu">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive ? "sideBarActive menu-text" : "menu-text"
                }
              >
                Trang chủ
              </NavLink>
              <NavLink
                to={"/course"}
                className={({ isActive }) =>
                  isActive ? "sideBarActive menu-text" : "menu-text"
                }
                onClick={() => {
                  resetSearch();
                }}
              >
                Khóa học
              </NavLink>
              <NavLink
                to={"/blog"}
                className={({ isActive }) =>
                  isActive ? "sideBarActive menu-text" : "menu-text"
                }
              >
                Blog
              </NavLink>
            </div>
            {localStorage.getItem("user") ? (
              <Button
                type="primary"
                htmlType="submit"
                className="header_button"
                size="large"
                onClick={() => {
                  navigate("/user/information/");
                }}
              >
                Tài khoản
              </Button>
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                className="header_button"
                size="large"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Đăng nhập
              </Button>
            )}

            <Link className="header_cart" to={"/cart"}>
              <Space size="middle">
                <Badge count={state} showZero>
                  <Avatar
                    shape="square"
                    size="large"
                    className="header_cart_icon"
                  >
                    <FaCartShopping></FaCartShopping>
                  </Avatar>
                </Badge>
              </Space>
            </Link>
          </div>
        </Header>
      </Layout>
    </div>
  );
};
export default memo(HeaderPage);
