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
import {
  getCartUser,
  getCourseById,
  getCourseUser,
  updateCart,
} from "service/UserService";
import { updateCount } from "redux/userSlice";
import { useDispatch } from "react-redux";
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
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState("");
  const [checkCart, setCheckCart] = useState("");
  const [checkAccept, setCheckAccept] = useState("");
  console.log(checkCart);
  const getCourseInfo = async () => {
    let res = await getCourseById(id);
    if (res) {
      setCourse(res?.data);
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
  useEffect(() => {
    getCourseInfo();
    getStatusCart();
    getStatusCourse();
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
                    <button onClick={() => {}}>
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
                Item One
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                Item Two
              </CustomTabPanel>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(CourseDetail);
