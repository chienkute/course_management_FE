import { memo, useEffect, useState } from "react";
import "./HomePage.scss";
import "../../../components/User/HomePage/styles.css";
import React from "react";
import banner from "../../../assets/banner-inside.png";
import achievement from "../../../assets/achievement-img.png";
import icon from "../../../assets/ic-achievement.svg";
import feedback from "../../../assets/cam-nhan-hoc-vien.png";
import { Link, useNavigate } from "react-router-dom";
import Course from "../../theme/Course/Course";
import { getAllCourse } from "service/UserService";
import { useDispatch } from "react-redux";
import { updateSearch } from "redux/userSlice";
const HomePage = () => {
  const [course, setCourse] = useState("");
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchCourse = () => {
    const updatedSearch = {
      search: `${value}`,
    };
    navigate("/course");
    dispatch(updateSearch(updatedSearch));
  };
  const getCourses = async () => {
    let res = await getAllCourse();
    if (res) {
      setCourse(res?.data);
    }
  };
  useEffect(() => {
    getCourses();
  }, []);
  return (
    <div className="home">
      <div className="home__banner">
        <header class="masthead">
          <div class="container px-5">
            <div class="row gx-5 align-items-center">
              <div class="col-lg-6 home__banner_content">
                <div class="mb-5 mb-lg-0 text-center text-lg-start">
                  <h1 class="display-1 mb-3 home__banner_title">
                    Khóa học WordPress thực chiến cùng với Huy Kira.
                  </h1>
                  <p class="mb-5 home__banner_text">
                    Học thiết kế & lập trình WordPress từ cơ bản đến nâng cao,
                    học lập trình WordPress với các dự án thực tế của công ty
                  </p>
                  <div className="home__banner_search">
                    <form>
                      <div className="home__banner_input">
                        <input
                          type="text"
                          placeholder="Tìm kiếm khóa học"
                          autoCapitalize="off"
                          onChange={(e) => {
                            setValue(e.target.value);
                          }}
                        />
                        <button
                          onClick={() => {
                            searchCourse();
                          }}
                        >
                          Tìm kiếm
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="masthead-device-mockup">
                  <svg
                    class="circle"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        id="circleGradient"
                        gradientTransform="rotate(45)"
                      >
                        <stop class="gradient-start-color" offset="0%"></stop>
                        <stop class="gradient-end-color" offset="100%"></stop>
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="50"></circle>
                  </svg>
                  <svg
                    class="shape-1 d-none d-sm-block"
                    viewBox="0 0 240.83 240.83"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="-32.54"
                      y="78.39"
                      width="305.92"
                      height="84.05"
                      rx="42.03"
                      transform="translate(120.42 -49.88) rotate(45)"
                    ></rect>
                    <rect
                      x="-32.54"
                      y="78.39"
                      width="305.92"
                      height="84.05"
                      rx="42.03"
                      transform="translate(-49.88 120.42) rotate(-45)"
                    ></rect>
                  </svg>
                  <svg
                    class="shape-2 d-none d-sm-block"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="50" cy="50" r="50"></circle>
                  </svg>
                  <div class="device-wrapper">
                    <div
                      class="device"
                      data-device="iPhoneX"
                      data-orientation="portrait"
                      className="home__banner_image"
                    >
                      <div>
                        <img src={banner} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
      <div className="home__course_container">
        <div className="home__course">
          <div className="home__course_text">
            <h2>Đang khuyến mãi</h2>
            <Link to={"/course"}>Xem tất cả</Link>
          </div>
          <div className="home__course_content">
            {course &&
              course.length > 0 &&
              course.map((item, index) => {
                return (
                  <Course
                    id={item?._id}
                    title={item?.title}
                    image={item?.image}
                    duration={item?.duration}
                    price={item?.price}
                  ></Course>
                );
              })}
          </div>
        </div>
      </div>
      <section id="features" style={{ backgroundColor: "#038c4b" }}>
        <div class="container px-5">
          <div class="row gx-5 align-items-center">
            <div
              class="col-lg-8 order-lg-1 mb-5 mb-lg-0"
              style={{ marginTop: "30px", transform: "translateX(100px)" }}
            >
              <div class="container-fluid px-5">
                <h2 className="home__achievement_title">Thành tựu</h2>
                <div className="home__achievement_text">
                  Đã có rất nhiều học viên chọn WordPress là ghề chính và có
                  công việc ngay sau khi hoàn thành các khóa học. Các khóa học
                  nâng cao giúp cho các bạn tự tin để hoàn thành các website có
                  độ phức tạp cao.
                </div>
                <div class="row gx-5" style={{ marginTop: "40px" }}>
                  <div class="col-md-6 mb-5 home__achievement_item">
                    <div className="home__achievement_icon">
                      <img src={icon} alt="" />
                    </div>
                    <div class="home__achievement_text">
                      <span class="">3</span>
                      <p class="mb-0">Giảng viên</p>
                    </div>
                  </div>
                  <div class="col-md-6 mb-5 home__achievement_item">
                    <div className="home__achievement_icon">
                      <img src={icon} alt="" />
                    </div>
                    <div class="home__achievement_text">
                      <span class="">15+</span>
                      <p class="mb-0">Khóa học</p>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-5 home__achievement_item">
                    <div className="home__achievement_icon">
                      <img src={icon} alt="" />
                    </div>
                    <div class="home__achievement_text">
                      <span class="">500+</span>
                      <p class="mb-0">Học viên</p>
                    </div>
                  </div>
                  <div class="col-md-6 mb-5 home__achievement_item">
                    <div className="home__achievement_icon">
                      <img src={icon} alt="" />
                    </div>
                    <div class="home__achievement_text">
                      <span class="">2</span>
                      <p class="mb-0">Hình thức học</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 order-lg-0">
              <div class="features-device-mockup">
                <svg
                  class="circle"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="circleGradient"
                      gradientTransform="rotate(45)"
                    >
                      <stop class="gradient-start-color" offset="0%"></stop>
                      <stop class="gradient-end-color" offset="100%"></stop>
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <svg
                  class="shape-1 d-none d-sm-block home__achievement_color"
                  viewBox="0 0 240.83 240.83"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="-32.54"
                    y="78.39"
                    width="305.92"
                    height="84.05"
                    rx="42.03"
                    transform="translate(120.42 -49.88) rotate(45)"
                  ></rect>
                  <rect
                    x="-32.54"
                    y="78.39"
                    width="305.92"
                    height="84.05"
                    rx="42.03"
                    transform="translate(-49.88 120.42) rotate(-45)"
                  ></rect>
                </svg>
                <svg
                  class="shape-2 d-none d-sm-block"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <div class="device-wrapper">
                  <div
                    class="device"
                    data-device="iPhoneX"
                    data-orientation="portrait"
                  >
                    <div className="home__achievement_image">
                      <img src={achievement} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="bg-light">
        <div class="container px-5">
          <div class="row gx-5 align-items-center justify-content-center justify-content-lg-between">
            <div class="col-12 col-lg-5 home__feedback_content">
              <h2 class="mb-4">Được tin tưởng bởi 2000+ học viên</h2>
              <p class="mb-5 mb-lg-0">
                Hơn 15 khoá học với hơn 500 học viên được tổ chức từ năm 2017
                đến nay.
              </p>
            </div>
            <div class="col-sm-8 col-md-6">
              <div class="px-5 px-sm-0 home__feedback_image">
                <img src={feedback} alt="..." />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default memo(HomePage);
