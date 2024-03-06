import { memo, React, useEffect, useState } from "react";
import "./Cart.scss";
import { Link } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { getUser, removeCourse } from "service/UserService";
import { removeCount } from "redux/userSlice";
import { useDispatch } from "react-redux";
const Cart = () => {
  const dispatch = useDispatch();
  const subCount = () => {
    const updatedCount = {
      count: 1,
    };
    dispatch(removeCount(updatedCount));
  };
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);
  let totalPrice = 0;
  const sumCourse = (cartCount) => {
    for (var i = 0; i < cartCount.length; i++) {
      totalPrice += cartCount[i].course.price * cartCount[i].quantity;
    }
    setCount(totalPrice.toLocaleString());
  };
  const getCart = async () => {
    let res = await getUser();
    if (res) {
      setCart(res?.data?.cart);
      sumCourse(res?.data?.cart);
    }
  };
  const formated = (price) => {
    price = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
    return price;
  };
  const deleteCourse = async (id) => {
    let res = await removeCourse(id, 1);
    if (res) {
      getCart();
      console.log(res);
    }
  };
  useEffect(() => {
    getCart();
  }, []);
  return (
    <div className="cart">
      <div className="cart__container">
        <h1 className="cart__title m-0 text-uppercase fs-2">Giỏ hàng</h1>
        <div className="cart__inner">
          <div className="cart__main">
            {cart &&
              cart?.length > 0 &&
              cart?.map((item, index) => {
                return (
                  <div className="cart__item">
                    <div className="cart__item_info">
                      <img src={item?.course?.image} alt="" />
                      <div className="cart__item_title">
                        <h5>{item?.course?.title}</h5>
                        <p className="cart__item_title_price">
                          Giá:
                          <span>{formated(item?.course?.price)}&nbsp;</span>
                        </p>
                      </div>
                    </div>
                    <div className="cart__item_total">
                      <p>
                        <span>{formated(item?.course?.price)}</span>
                      </p>
                      <Link
                        onClick={() => {
                          deleteCourse(item?.course?._id);
                          subCount();
                        }}
                      >
                        <FaRegTrashCan></FaRegTrashCan>
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="cart__pay">
            <div className="cart__totals">
              <table className="cart__totals_table">
                <tbody>
                  <tr className="cart__totals_table_sub">
                    <th>Tạm tính</th>
                    <td>
                      <span>
                        {count}&nbsp;
                        <span>₫</span>
                      </span>
                    </td>
                  </tr>
                  <tr className="cart__totals_table_total">
                    <th>Tổng</th>
                    <td>
                      <strong>
                        <span>
                          {count}&nbsp;
                          <span>₫</span>
                        </span>
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
              {cart && cart.length > 0 ? (
                <div className="cart__totals_checkout">
                  <Link to={"/checkout"}>Tiến hành thanh toán</Link>
                </div>
              ) : (
                <div className="cart__totals_checkout checkout__button">
                  <Link>Tiến hành thanh toán</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Cart);
