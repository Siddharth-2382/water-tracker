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
  drinkingEvents: { time: string; size: string }[];
}

function LineChart({ drinkingEvents }: ChartProps) {
  // Get unique time values
  const uniqueTimes = Array.from(
    new Set(drinkingEvents.map((item) => item.time))
  );

  // Initialize an object to store counts for each time
  const countsByTime: { [time: string]: number } = {};

  // Calculate counts for each time
  drinkingEvents.map((item) => {
    const { time } = item;
    countsByTime[time] = (countsByTime[time] || 0) + 1;
    return countsByTime[time];
  });

  // Filter unique times and corresponding counts
  const uniqueTimesWithCounts = uniqueTimes.map((time) => countsByTime[time]);
  const chartData = {
    labels: uniqueTimes,
    datasets: [
      {
        label: "Total glass drank",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        data: uniqueTimesWithCounts,
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
