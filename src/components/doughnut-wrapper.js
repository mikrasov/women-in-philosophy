import React from "react";
import { Chart, Doughnut } from "react-chartjs-2";

const originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
  draw() {
    originalDoughnutDraw.apply(this, arguments);

    const { chart } = this.chart;
    const { ctx } = chart;
    const { width } = chart;
    const { height } = chart;

    const fontSize = (height / 114).toFixed(2);
    ctx.font = `${fontSize}em Verdana`;
    ctx.textBaseline = "middle";

    const text = chart.config.data.text ? chart.config.data.text : "";
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 2;

    ctx.fillText(text, textX, textY);
  },
});

export default function DoughnutWrapper({ data }) {
  return (
    <div className="doughnut-chart">
      <Doughnut
        data={data}
        options={{ maintainAspectRatio: true, legend: { display: false } }}
        width={50}
        height={50}
      />
    </div>
  );
}
