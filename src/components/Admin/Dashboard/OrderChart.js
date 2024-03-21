import { memo, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { getOrderStatic } from "service/AdminService";
const OrderChart = () => {
  const [orderData, setOrderData] = useState(null);
  const fetchData = async () => {
    let res = await getOrderStatic();
    if (res) {
      setOrderData(res);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (orderData) {
      drawChart(orderData);
    }
  }, [orderData]);
  const drawChart = (orderData) => {
    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Cancelled Orders", "Succeeded Orders"],
        datasets: [
          {
            label: "Order Statistics",
            data: [orderData.cancelledOrders, orderData.succeededOrders],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <div style={{ maxWidth: "50%" }}>
      <h2>Order Statistics</h2>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
};
export default memo(OrderChart);
