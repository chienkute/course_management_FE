import { memo } from "react";
import "./Course.scss";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo2.png";
import { CiHeart } from "react-icons/ci";
import tag from "../../../assets/tag.svg";
const Course = (props) => {
  const { id, title, image, duration, price } = props;
  const formated = (price) => {
    price = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
    return price;
  };
  return (
    <div className="course">
      <div className="course__thumbnail">
        <Link to={`/detail/${id}`}>
          <img src={image} alt="" />
        </Link>
      </div>
      <div className="course__detail">
        <div className="course__logo">
          <img src={logo} alt="" />
        </div>
        <div className="course__header">
          <Link to={`/detail/${id}`}>{title}</Link>
        </div>
        <div className="course__content">
          <div className="course__line">
            <span>Thời lượng:</span>
            <strong> {duration}</strong>
          </div>
          <div className="course__line">
            <span>Hình thức học:</span>
            <strong className="text-green">Học Online</strong>
          </div>
        </div>
        <div className="course__bottom">
          <div className="course__price">
            {formated(price) === 0 ? "Miễn phí" : formated(price)}
          </div>
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
              <Link to={`/detail/${id}`}>Đăng ký ngay</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Course);
