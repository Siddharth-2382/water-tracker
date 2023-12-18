import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

interface ChartProps {
  glassCounts: number[];
  drinkingTimes: string[];
}

function LineChart({ glassCounts, drinkingTimes }: ChartProps) {
  const chartData = {
    labels: drinkingTimes,
    datasets: [
      {
        label: "Glass Count",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: glassCounts,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    width: 800,
    height: 600,
  };

  return <Line data={chartData} options={options} />;
}

export default LineChart;
