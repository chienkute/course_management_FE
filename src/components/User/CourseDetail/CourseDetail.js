import { memo, React, useEffect, useState } from "react";
import "./CourseDetail.scss";
import ReactStars from "react-stars";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TbShoppingCartPlus, TbShoppingCart } from "react-icons/tb";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import moment from "moment";
import {
  getCartUser,
  getCourseById,
  getCourseUser,
  getUser,
  rating,
  updateCart,
} from "service/UserService";
import { updateCount } from "redux/userSlice";
import { useDispatch } from "react-redux";
import { CiStar } from "react-icons/ci";
import { Button, Progress } from "antd";
import avatar from "../../../assets/avatar.jpg";
import { toast } from "react-toastify";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const CourseDetail = () => {
  const dispatch = useDispatch();
  const addCount = () => {
    const updatedCount = {
      count: 1,
    };
    dispatch(updateCount(updatedCount));
  };
  const [value, setValue] = useState(0);
  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [average, setAverage] = useState(0);
  const [idUser, setIdUser] = useState(null);
  const [showRating, setShowRating] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // moment(updatedAt)?.fromNow()
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState("");
  const [checkCart, setCheckCart] = useState("");
  const [checkAccept, setCheckAccept] = useState("");
  const percent = (ratingCount) => {
    return Math.round((ratingCount * 100) / ratings.length);
  };
  const fixedNumber = (count, number) => {
    return count.toFixed(number);
  };
  const ratingCourse = async () => {
    let res = await rating(star, id, comment, Date.now());
    if (res?.data) {
      getCourseInfo();
    } else {
      toast.error("Bạn nhập thiếu trường nào đó !!");
    }
  };
  const getCourseInfo = async () => {
    let res = await getCourseById(id);
    if (res) {
      setCourse(res?.data);
      setRatings(res?.data?.ratings);
      setAverage(res?.data?.rating_count);
    }
  };
  const addtoCart = async () => {
    let res = await updateCart(course?._id, 1);
    if (res) {
      console.log(res);
      navigate("/cart");
    }
  };
  const formated = (price) => {
    price = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
    return price;
  };
  const getStatusCart = async () => {
    let res = await getCartUser(id);
    if (res) {
      setCheckCart(res?.success);
      console.log(res);
    }
  };
  const getStatusCourse = async () => {
    let res = await getCourseUser(id);
    if (res) {
      setCheckAccept(res?.accept);
    }
  };
  const getIdUser = async () => {
    let res = await getUser();
    if (res) {
      setIdUser(res?.data?._id);
    }
  };
  useEffect(() => {
    getCourseInfo();
    getStatusCart();
    getStatusCourse();
    getIdUser();
  }, []);
  return (
    <div className="detail">
      <div className="detail__container">
        <div className="detail__card">
          <div className="row g-4">
            <div className="col-lg-6 detail__card_left">
              <div className="detail__card_thumbnail">
                <img src={course?.image} alt="" />
              </div>
            </div>
            <div className="col-lg-6 detail__card_right">
              <div className="detail__card_product">
                <header className="detail__card_header">
                  <h1>
                    <span>{course?.title}</span>
                  </h1>
                  <div className="detail__card_top">
                    <div className="detail__card_rating">
                      <div className="detail__card_rating_star">
                        <ReactStars
                          count={5}
                          value={average}
                          edit={false}
                          size={24}
                        ></ReactStars>
                      </div>
                      <div className="detail__card_rating_average">
                        {fixedNumber(average, 2)}
                      </div>
                      <div className="detail__card_rating_count">
                        ({ratings?.length} Đánh giá)
                      </div>
                    </div>
                  </div>
                </header>
                <hr />
                <div className="detail_content">
                  <div className="course__line">
                    <span>Thời lượng:</span>
                    <strong> {course?.duration} </strong>
                  </div>
                  <div className="course__line">
                    <span>Hình thức học:</span>
                    <strong className="text-green">Học Online</strong>
                  </div>
                  <div className="course__line">
                    <span>Giảng viên:</span>
                    <strong>
                      <Link>Chiến Kute</Link>
                    </strong>
                  </div>
                </div>
                <hr />
                <div className="detail__card_body">
                  <div className="detail__card_price">
                    <span>{formated(course?.price)}&nbsp;</span>
                  </div>
                  {checkCart === true ? (
                    <button
                      onClick={() => {
                        navigate("/cart");
                      }}
                    >
                      <div>
                        <TbShoppingCart></TbShoppingCart>
                      </div>
                      <span>Xem giỏ hàng</span>
                    </button>
                  ) : checkAccept === true ? (
                    <button
                      onClick={() => {
                        navigate(`/lesson/${id}`);
                      }}
                    >
                      <div>
                        <TbShoppingCart></TbShoppingCart>
                      </div>
                      <span>Xem khóa học</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        addtoCart();
                        addCount();
                      }}
                    >
                      <div>
                        <TbShoppingCartPlus></TbShoppingCartPlus>
                      </div>
                      <span>Thêm vào giỏ hàng</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="detail__card">
          <div className="detail__card_tab">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Chi tiết khóa học" {...a11yProps(0)} />
                  <Tab label="Cảm nhận học viên" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                Item one
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <div className="detail__tab_comment">
                  <h3>Cảm nhận học viên</h3>
                  <div className="detail__tab_review">
                    <div className="detail__tab_review_summary">
                      <div className="detail__tab_review_summary_content">
                        <div className="detail__tab_review_summary_content_left">
                          <div className="detail__tab_review_summary_content_average">
                            {fixedNumber(average, 1)}
                          </div>
                          <div className="detail__tab_review_summary_content_star">
                            <ReactStars
                              count={5}
                              value={average}
                              edit={false}
                              size={25}
                            ></ReactStars>
                          </div>
                          <div className="detail__tab_review_summary_content_count">
                            Tổng cộng {ratings?.length || "0"} đánh giá
                          </div>
                        </div>
                        <div className="detail__tab_review_summary_content_right">
                          {Array.from(Array(5).keys())
                            .reverse()
                            .map((el) => (
                              <div className="detail__tab_review_summary_content_rating">
                                <div className="detail__tab_review_summary_content_rating_star">
                                  <CiStar></CiStar>
                                  <span>{el + 1}</span>
                                </div>
                                <div className="detail__tab_review_summary_content_rating_progress">
                                  <Progress
                                    percent={percent(
                                      ratings?.filter((i) => i.star === el + 1)
                                        ?.length
                                    )}
                                    showInfo={false}
                                  />
                                </div>
                                <div className="detail__tab_review_summary_content_rating_count">
                                  <span>
                                    {
                                      ratings?.filter((i) => i.star === el + 1)
                                        ?.length
                                    }
                                    {"   "}
                                    Đánh giá
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    <div className="detail__tab_review_line"></div>
                    <div className="detail__tab_review_list">
                      {ratings &&
                        ratings?.length > 0 &&
                        ratings?.map((item, index) => {
                          return (
                            <div className="detail__tab_review_list_body row">
                              <div className="detail__tab_review_list_body_info col-lg-3">
                                <div className="detail__tab_review_list_body_info_avatar">
                                  <img
                                    src={item?.postedBy?.avatar || avatar}
                                    alt=""
                                  />
                                </div>
                                <div className="detail__tab_review_list_body_info_name">
                                  {item?.postedBy?.firstname} {"  "}{" "}
                                  {item?.postedBy?.lastname}
                                </div>
                              </div>
                              <div className="detail__tab_review_list_body_comment col-lg-9">
                                <div className="detail__tab_review_list_body_comment_star">
                                  <ReactStars
                                    count={5}
                                    value={item?.star}
                                    edit={false}
                                    size={24}
                                  ></ReactStars>
                                </div>
                                <div className="detail__tab_review_list_body_comment_content">
                                  {item?.comment}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  {ratings?.some((i) => i?.postedBy?._id === idUser) ? (
                    <div>
                      <Button
                        type="primary"
                        size="large"
                        style={{ marginTop: "20px" }}
                        onClick={() => {
                          setShowUpdate(true);
                        }}
                      >
                        Sửa đánh giá
                      </Button>
                      {showUpdate && (
                        <div className="detail__tab_write">
                          <div className="detail__tab_write_star">
                            <ReactStars
                              count={5}
                              value={2}
                              size={40}
                              onChange={setStar}
                            ></ReactStars>
                          </div>
                          <div className="detail__tab_write_comment">
                            <textarea
                              name="review"
                              placeholder="Viết đánh giá"
                              onChange={(e) => {
                                setComment(e.target.value);
                              }}
                            ></textarea>
                          </div>
                          <Button
                            type="primary"
                            size="large"
                            onClick={() => {
                              ratingCourse();
                              setShowUpdate(false);
                            }}
                          >
                            Gửi đánh giá
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <Button
                        type="primary"
                        size="large"
                        onClick={() => {
                          setShowRating(true);
                        }}
                        style={{ marginTop: "20px" }}
                      >
                        Đánh giá
                      </Button>
                      {showRating && (
                        <div className="detail__tab_write">
                          <div className="detail__tab_write_star">
                            <ReactStars
                              count={5}
                              value={2}
                              size={40}
                              onChange={setStar}
                            ></ReactStars>
                          </div>
                          <div className="detail__tab_write_comment">
                            <textarea
                              name="review"
                              placeholder="Viết đánh giá"
                              onChange={(e) => {
                                setComment(e.target.value);
                              }}
                            ></textarea>
                          </div>
                          <Button
                            type="primary"
                            size="large"
                            onClick={() => {
                              ratingCourse();
                            }}
                          >
                            Gửi đánh giá
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CustomTabPanel>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(CourseDetail);
