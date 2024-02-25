import { memo } from "react";
import "./Course.scss";
import React from "react";
import { Link } from "react-router-dom";
import thumbnail from "../../../assets/thumbnail1.jpg";
import logo from "../../../assets/logo2.png";
import { CiHeart } from "react-icons/ci";
import tag from "../../../assets/tag.svg";
const Course = () => {
  return (
    <div className="course">
      <div className="course__thumbnail">
        <Link>
          <img src={thumbnail} alt="" />
        </Link>
      </div>
      <div className="course__detail">
        <div className="course__logo">
          <img src={logo} alt="" />
        </div>
        <div className="course__header">
          <Link>Khóa học WordPress Cơ bản danh cho người mới bắt đầu</Link>
        </div>
        <div className="course__content">
          <div className="course__line">
            <span>Thời lượng:</span>
            <strong> 2 giờ - 3 phút </strong>
          </div>
          <div className="course__line">
            <span>Hình thức học:</span>
            <strong className="text-green">Học Online</strong>
          </div>
        </div>
        <div className="course__bottom">
          <div className="course__price">Miễn phí</div>
          <div className="course__action">
            <div className="course__whishlist">
              <Link>
                <CiHeart></CiHeart>
              </Link>
              <div className="course__slot">
                <img src={tag} alt="" />
                <span>1000 suất</span>
              </div>
            </div>
            <div className="course__subscribe">
              <Link>Đăng ký ngay</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Course);
