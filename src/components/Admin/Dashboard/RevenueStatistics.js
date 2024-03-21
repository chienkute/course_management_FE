import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { getRevenue } from "service/AdminService";

const RevenueStatistics = () => {
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchRevenueByMonth = async () => {
      let res = await getRevenue(); // Đổi đường dẫn API tương ứng
      setRevenueData(res.data);
    };

    fetchRevenueByMonth();
  }, []);

  useEffect(() => {
    if (revenueData.length > 0) {
      drawChart(revenueData);
    }
  }, [revenueData]);

  const drawChart = (revenueData) => {
    const months = [];
    const revenues = [];

    // Tạo mảng chứa doanh thu của từng tháng
    for (let i = 1; i <= 12; i++) {
      const revenueEntry = revenueData.find((entry) => entry._id === i);
      if (revenueEntry) {
        months.push(i);
        revenues.push(revenueEntry.totalRevenue);
      } else {
        months.push(i);
        revenues.push(0);
      }
    }

    const ctx = document.getElementById("revenue");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: months,
        datasets: [
          {
            label: "Revenue",
            data: revenues,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
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
    <div style={{ width: "50%", marginLeft: "200px" }}>
      <h2>Revenue Statistics</h2>
      <canvas id="revenue" width="400" height="400"></canvas>
    </div>
  );
};

export default RevenueStatistics;
