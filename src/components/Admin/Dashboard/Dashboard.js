import { memo } from "react";
import "./Dashboard.scss";
import "./_card.scss";
import "./_charts.scss";
import { useEffect, useState } from "react";
import "chartjs-plugin-datalabels";
import { getAllCourse } from "service/UserService";
import { getBlogs, getOrders } from "service/AdminService";
import ChartStatic from "./ChartStatic";
import OrderChart from "./OrderChart";
import RevenueStatistics from "./RevenueStatistics";
const Dashboard = () => {
  const [course, setCourse] = useState(0);
  const [totalPrice, setTotalPrice] = useState("");
  const [checkout, setCheckout] = useState("");
  console.log(totalPrice);
  const [blog, setBlog] = useState(0);
  const getCountCourse = async () => {
    let res = await getAllCourse();
    if (res) {
      setCourse(res?.data?.length);
    }
  };
  const getAllOrder = async () => {
    let res = await getOrders();
    let count = 0;
    if (res) {
      setCheckout(res?.data);
      res?.data?.forEach((item) => (count += item?.total));
      setTotalPrice(count);
    }
  };
  const formated = (price) => {
    price = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
    return price;
  };
  const getCountBlog = async () => {
    let res = await getBlogs("");
    if (res) {
      setBlog(res?.data?.length);
    }
  };
  useEffect(() => {
    getCountCourse();
    getCountBlog();
    getAllOrder();
  }, []);

  return (
    <div>
      <div class="container-fluid">
        <div class="row mt-4">
          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Tổng số khóa học
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">
                      {course}
                    </div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-calendar fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                      Doanh thu
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">
                      {formated(totalPrice)}
                    </div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-info shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                      Tổng số đơn hàng
                    </div>
                    <div class="row no-gutters align-items-center">
                      <div class="col-auto">
                        <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                          {checkout?.length || 0}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-warning shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      Tổng số bài viết
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">
                      {blog}
                    </div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-comments fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            columnGap: "140px",
          }}
        >
          <ChartStatic></ChartStatic>
          <OrderChart></OrderChart>
        </div>
        <RevenueStatistics></RevenueStatistics>
      </div>
    </div>
  );
};
export default memo(Dashboard);
