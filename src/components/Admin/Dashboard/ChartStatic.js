import { memo, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { getTotalStatic } from "service/AdminService";
const ChartStatic = () => {
  const [revenue, setRevenue] = useState(0);
  const fetchRevenue = async () => {
    let res = await getTotalStatic();
    if (res) {
      setRevenue(res?.data);
    }
  };
  useEffect(() => {
    fetchRevenue();
  }, []);
  useEffect(() => {
    if (revenue > 0) {
      drawChart(revenue);
    }
  }, [revenue]);
  const drawChart = (revenue) => {
    const ctx = document.getElementById("revenueChart");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Revenue"],
        datasets: [
          {
            label: "Revenue",
            data: [revenue],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
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
      <h2>Revenue Statistics</h2>
      <canvas id="revenueChart" width="400" height="400"></canvas>
    </div>
  );
};
export default memo(ChartStatic);
