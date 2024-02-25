import { memo, useEffect, useState } from "react";
import "./HeaderPage.scss";
import React from "react";
import { Button, Layout, Menu } from "antd";
import logo from "../../../assets/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Badge, Space } from "antd";
const { Header } = Layout;
const HeaderPage = () => {
  const items1 = ["Trang chủ", "Khóa học", "Blog"].map((key, index) => ({
    key: index.toString(),
    label: `${key}`,
    path: index === 0 ? "/" : index === 1 ? "/course" : "/blog",
  }));
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState(() => {
    const storedSelectedKey = localStorage.getItem("selectedMenuItem");
    return storedSelectedKey ? [storedSelectedKey] : ["0"];
  });
  useEffect(() => {
    const path = location.pathname;
    const selectedItem = items1.find((item) => item.path === path);
    if (selectedItem) {
      setSelectedKeys([selectedItem.key]);
      localStorage.setItem("selectedMenuItem", selectedItem.key);
    }
  }, [location]);
  useEffect(() => {
    const storedSelectedKey = localStorage.getItem("selectedMenuItem");
    if (storedSelectedKey && storedSelectedKey !== selectedKeys[0]) {
      setSelectedKeys([storedSelectedKey]);
    }
  }, []);
  return (
    <div className="header">
      <Layout>
        <Header className="header_layout">
          <Link className="header_logo" to={"/"}>
            <img src={logo} alt="" className="header_logo_image_icon" />
          </Link>
          <div className="header_item">
            <Menu
              mode="horizontal"
              defaultSelectedKeys={selectedKeys}
              style={{
                flex: 1,
                minWidth: 0,
              }}
              className="header_menu"
            >
              {items1.map((item) => (
                <Menu.Item key={item.key}>
                  <Link to={item.path}>{item.label}</Link>
                </Menu.Item>
              ))}
            </Menu>
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
            <Link className="header_cart">
              <Space size="middle">
                <Badge count={5}>
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
