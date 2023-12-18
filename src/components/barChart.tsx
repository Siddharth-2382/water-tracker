import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip
);

interface ChartProps {
  drinkingEvents: { time: string; size: string }[];
}

function BarChart({ drinkingEvents }: ChartProps) {
  const chartData = {
    labels: drinkingEvents.map((event) => event.time),
    datasets: [
      {
        label: "Total glass drank",
        borderColor: "rgb(0, 102, 255)",
        backgroundColor: "rgb(0, 102, 255, 0.5)",
        data: drinkingEvents.map((event) => Number(event.size.split(" ")[0])),
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
        text: "Amount of Water (in ml) vs Time",
      },
    },
  };
  return <Bar data={chartData} options={options} />;
}

export default BarChart;
