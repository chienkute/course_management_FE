import { memo, useEffect, useState } from "react";
import "./History.scss";
import UserPage from "../UserPage";
import { Table } from "antd";
import { getUserOrder } from "service/UserService";
import moment from "moment";
const { Column } = Table;
const History = () => {
  const [orders, setOrders] = useState([]);
  const formated = (price) => {
    price = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
    return price;
  };
  console.log(orders);
  const getOrders = async () => {
    let res = await getUserOrder();
    if (res) {
      setOrders(res?.data);
    }
  };
  let data = orders.map((item, index) => {
    let coursesNames = item?.courses
      ?.map((course) => course?.course?.title)
      .join(", ");
    return {
      key: `${index}`,
      name: coursesNames,
      date: `${moment(item?.createdAt).format("DD/MM/YYYY")}`,
      price: `${formated(item?.total)}`,
      status: `${item?.status === "Succeed" ? "Thành công" : "Thất bại"}`,
    };
  });
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="UserPageContainer">
      <div className="UserPageContent">
        <UserPage></UserPage>
        <div className="history">
          <div className="history__table">
            <Table dataSource={data}>
              <Column
                title="Tên khóa học"
                dataIndex="name"
                key="name"
                className="history__col"
              />
              <Column title="Ngày" dataIndex="date" key="date" />
              <Column title="Tổng" dataIndex="price" key="price" />
              <Column title="Trạng thái" dataIndex="status" key="status" />
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(History);
