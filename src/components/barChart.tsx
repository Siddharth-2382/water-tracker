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
  // Create a dictionary to store aggregated sizes for each time
  const aggregatedData: { [time: string]: number } = {};

  // Aggregate sizes based on time
  drinkingEvents.forEach((entry) => {
    const time = entry.time;
    const size = parseInt(entry.size.split(" ")[0], 10); // Extract the numeric part of the size
    aggregatedData[time] = (aggregatedData[time] || 0) + size;
  });

  // Extract time and size for plotting
  const times = Object.keys(aggregatedData);
  const sizes = times.map((time) => aggregatedData[time]);

  const chartData = {
    labels: times,
    datasets: [
      {
        label: "Total glass drank",
        borderColor: "rgb(0, 102, 255)",
        backgroundColor: "rgb(0, 102, 255, 0.5)",
        data: sizes,
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
