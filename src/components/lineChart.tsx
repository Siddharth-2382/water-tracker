import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Title,
  Tooltip
);

interface ChartProps {
  glassCounts: number[];
  drinkingTimes: string[];
}

function LineChart({ glassCounts, drinkingTimes }: ChartProps) {
  const chartData = {
    labels: drinkingTimes,
    datasets: [
      {
        label: "Total glass drank",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        data: glassCounts,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    width: 800,
    height: 600,
    plugins: {
      title: {
        display: true,
        text: "Total Glass Drank vs Time",
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default LineChart;
