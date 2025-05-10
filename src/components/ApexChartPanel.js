import React from "react";
import Chart from "react-apexcharts";

export default function ApexChartPanel({ posts, comments }) {
  const chartData = {
    series: [10, posts.length, comments.length],
    options: {
      chart: { type: "donut" },
      labels: ["Users (Static)", "Posts", "Comments"],
      legend: { position: "bottom" },
    },
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Dashboard Overview</h2>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        height={300}
      />
    </div>
  );
}
