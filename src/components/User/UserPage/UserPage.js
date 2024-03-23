import { memo } from "react";
import "./UserPage.scss";
import { NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BsBookmarks } from "react-icons/bs";
import { BsMortarboard } from "react-icons/bs";
const UserPage = () => {
  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  return (
    <div className="UserPageMenu">
      <div className="ListOption clear">
        <NavLink
          to={`/user/information/`}
          className={({ isActive }) =>
            isActive ? "sideBarActive Option selected" : "Option selected"
          }
        >
          <div className="OptionIcon">
            <FaRegUser />
          </div>
          <div className="OptionName">Hồ sơ</div>
        </NavLink>
        <NavLink
          to={`/user/course/`}
          className={({ isActive }) =>
            isActive ? "sideBarActive Option selected" : "Option selected"
          }
        >
          <div className="OptionIcon">
            <BsMortarboard></BsMortarboard>
          </div>
          <div className="OptionName">Các khóa học của bạn</div>
        </NavLink>
        <NavLink
          to={`/user/history/`}
          className={({ isActive }) =>
            isActive ? "sideBarActive Option selected" : "Option selected"
          }
        >
          <div className="OptionIcon">
            <BsCart></BsCart>
          </div>
          <div className="OptionName">Lịch sử đơn hàng</div>
        </NavLink>
        <NavLink
          to={`/user/changepassword`}
          className={({ isActive }) =>
            isActive ? "sideBarActive Option selected" : "Option selected"
          }
        >
          <div className="OptionIcon">
            <RiLockPasswordLine></RiLockPasswordLine>
          </div>
          <div className="OptionName">Đổi mật khẩu</div>
        </NavLink>
        <NavLink
          className="Option selected"
          onClick={() => {
            Logout();
          }}
          to={"/login"}
        >
          <div className="OptionIcon">
            <IoIosLogOut></IoIosLogOut>
          </div>
          <div className="OptionName">Đăng xuất</div>
        </NavLink>
      </div>
    </div>
  );
};
export default memo(UserPage);
