import { memo } from "react";
import "./index.scss";
import AdminSideBar from "components/Admin/AdminSideBar/AdminSideBar";
const AdminLayOut = ({ children, ...props }) => {
  return (
    <div {...props} className="adminLayout">
      <div className="adminLayout__page">
        <div className="adminLayout__sidebar">
          <AdminSideBar></AdminSideBar>
        </div>
        <div className="adminLayout__content ">{children}</div>
      </div>
    </div>
  );
};
export default memo(AdminLayOut);
