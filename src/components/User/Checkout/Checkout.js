import { memo, React, useEffect, useState } from "react";
import "./Checkout.scss";
import Paypal from "components/theme/Paypal/paypal";
import { getUser } from "service/UserService";
const Checkout = () => {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState([]);
  const [count, setCount] = useState(0);
  const [fistName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [address, setaddress] = useState(null);
  const [mobile, setMobile] = useState(null);
  let totalPrice = 0;
  let usdCount = Math.round(count / 23000);
  console.log(fistName);
  const getCart = async () => {
    let res = await getUser();
    if (res) {
      setCourses(res?.data?.cart);
      setUser(res?.data);
      sumCourse(res?.data?.cart);
      setFirstName(res?.data?.firstname);
      setLastName(res?.data?.lastname);
      setaddress(res?.data?.address);
      setMobile(res?.data?.mobile);
    }
  };
  const sumCourse = (cartCount) => {
    for (var i = 0; i < cartCount.length; i++) {
      totalPrice += cartCount[i].course.price * cartCount[i].quantity;
    }
    setCount(totalPrice);
  };
  const formated = (price) => {
    price = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
    return price;
  };
  useEffect(() => {
    getCart();
  }, []);
  return (
    <div className="checkout">
      <div className="checkout__container">
        <div className="row pt-0 mb-5">
          <div className="col-12 checkout__information">
            <h3 className="text-uppercase">Thông tin thanh toán</h3>
            <form className="checkout__information_details">
              <div class="mb-3">
                <label for="firstname" class="form-label">
                  Họ <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="firstname"
                  name="firstname"
                  defaultValue={fistName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div class="mb-3">
                <label for="lastname" class="form-label">
                  Tên <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="lastname"
                  name="lastname"
                  defaultValue={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
              <div class="mb-3">
                <label for="mobile" class="form-label">
                  Số điện thoại <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="mobile"
                  name="mobile"
                  aria-describedby="emailHelp"
                  defaultValue={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                />
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">
                  Địa chỉ <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  name="address"
                  aria-describedby="emailHelp"
                  defaultValue={address}
                  onChange={(e) => {
                    setaddress(e.target.value);
                  }}
                />
              </div>
            </form>
          </div>
          <div className="col-12 mt-4 checkout__order">
            <h3 className="text-uppercase">Thông tin đơn hàng</h3>
            <div className="checkout__order_info">
              <table>
                <thead>
                  <tr>
                    <th className="checkout__order_info_product">Sản phẩm</th>
                    <th className="checkout__order_info_total">Tạm tính</th>
                  </tr>
                </thead>
                <tbody>
                  {courses &&
                    courses.length > 0 &&
                    courses?.map((item, index) => {
                      return (
                        <tr>
                          <td className="checkout__order_info_product">
                            {item?.course?.title}&nbsp;
                            <strong>x&nbsp;1</strong>
                          </td>
                          <td className="checkout__order_info_total">
                            <span>{formated(item?.course?.price)}&nbsp;</span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
                <tfoot>
                  <tr>
                    <th className="checkout__order_info_product">Tổng</th>
                    <td className="checkout__order_info_total">
                      <strong>
                        <span>{formated(count)}&nbsp;</span>
                      </strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
              <div className="checkout__order_payment">
                <div className="checkout__order_payment_title">
                  Thanh toán bằng Paypal
                </div>
                {fistName && lastName && address && mobile && (
                  <div className="checkout__order_payment_paypal">
                    <Paypal
                      amount={usdCount}
                      payload={{
                        courses: courses,
                        total: count,
                      }}
                    ></Paypal>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Checkout);
