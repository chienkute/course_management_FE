import { memo } from "react";
import "./FooterPage.scss";
import React from "react";
import logo from "../../../assets/logo-footer.svg";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  TwitchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const FooterPage = () => {
  return (
    <div className="footer">
      <footer className="footer_container">
        <div className="footer_logo">
          <img src={logo} alt="" />
        </div>
        <div className="footer_menu">
          <Link>Trang chủ</Link>
          <Link>Khóa học</Link>
          <Link>Blog</Link>
        </div>
        <div className="footer_icon">
          <Link>
            <FacebookOutlined />
          </Link>
          <Link>
            <InstagramOutlined />
          </Link>
          <Link>
            <LinkedinOutlined />
          </Link>
          <Link>
            <TwitchOutlined />
          </Link>
        </div>
        <hr class="mb-4" />
        <div class="text-center p-3">
          © 2020 Copyright: Khóa học WordPress All Rights Reserved
        </div>
      </footer>
    </div>
  );
};
export default memo(FooterPage);
