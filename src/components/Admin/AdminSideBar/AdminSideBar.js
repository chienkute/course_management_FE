import { memo, React } from "react";
import "./AdminSideBar.scss";
import logo from "../../../assets/logo5.png";
import { Link } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { Menu } from "antd";
const AdminSideBar = () => {
  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
  };
  const getItem = (label, key, router, children) => {
    return {
      key,
      children,
      label: <Link to={`/admin/${router}`}>{label}</Link>,
    };
  };
  const getsItem = (label, key, children) => {
    return {
      key,
      children,
      label,
    };
  };
  const Logout = (label, key, router) => {
    return {
      key,
      label: (
        <Link
          to={`/${router}`}
          onClick={() => {
            handleLogout();
          }}
        >
          {label}
        </Link>
      ),
    };
  };
  const items = [
    getItem("Thống kê", "1", "dashboard"),
    getItem("Quản lý người dùng", "2", "user"),
    getItem("Quản lý chủ đề khóa học", "3", "category"),
    getItem("Quản lý khóa học", "4", "course"),
    getItem("Quản lý các chương của khóa", "5", "chapter"),
    getItem("Quản lý blog", "6", "blog"),
    Logout("Đăng xuất", "7", "login"),
  ];
  return (
    <div className="admin">
      <div className="admin__container">
        <Link className="admin__container_logo">
          <img src={logo} alt="" />
        </Link>
        <div className="admin__container_line"></div>
        <div className="admin__container_sidebar">
          <Sider width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["2"]}
              defaultOpenKeys={["sub1"]}
              style={{
                height: "100%",
              }}
              items={items}
            />
          </Sider>
        </div>
      </div>
    </div>
  );
};
export default memo(AdminSideBar);
