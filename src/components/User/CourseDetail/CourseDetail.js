import { memo, React } from "react";
import "./CourseDetail.scss";
import thumbnail from "../../../assets/thumbnail1.jpg";
import ReactStars from "react-stars";
import { Link } from "react-router-dom";
import { TbShoppingCartPlus } from "react-icons/tb";
const CourseDetail = () => {
  return (
    <div className="detail">
      <div className="detail__container">
        <div className="detail__card">
          <div className="row g-4">
            <div className="col-lg-6 detail__card_left">
              <div className="detail__card_thumbnail">
                <img src={thumbnail} alt="" />
              </div>
            </div>
            <div className="col-lg-6 detail__card_right">
              <div className="detail__card_product">
                <header className="detail__card_header">
                  <h1>
                    <span>Khoá học tìm hiểu custom database WordPress</span>
                  </h1>
                  <div className="detail__card_top">
                    <div className="detail__card_rating">
                      <div className="detail__card_rating_star">
                        <ReactStars
                          count={5}
                          value={2}
                          edit={false}
                          size={24}
                        ></ReactStars>
                      </div>
                      <div className="detail__card_rating_average">5.00</div>
                      <div className="detail__card_rating_count">
                        (3 Đánh giá)
                      </div>
                    </div>
                  </div>
                </header>
                <hr />
                <div className="course__content">
                  <div className="course__line">
                    <span>Thời lượng:</span>
                    <strong> 2 giờ - 3 phút </strong>
                  </div>
                  <div className="course__line">
                    <span>Hình thức học:</span>
                    <strong className="text-green">Học Online</strong>
                  </div>
                  <div className="course__line">
                    <span>Giảng viên:</span>
                    <strong>
                      <Link>Huy Kira</Link>
                    </strong>
                  </div>
                </div>
                <div className="detail__card_body">
                  <div className="detail__card_price">
                    <div>
                      <span>
                        1.500.000
                        <span>₫</span>
                      </span>
                    </div>
                  </div>
                  <button>
                    <div>
                      <TbShoppingCartPlus></TbShoppingCartPlus>
                    </div>
                    <span>Thêm vào giỏ hàng</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(CourseDetail);
