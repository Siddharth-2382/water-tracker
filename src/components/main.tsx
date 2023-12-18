import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import LineChart from "./lineChart";
import { Toaster, toast } from "sonner";

function Main() {
  const [glassCounts, setGlassCounts] = useState<number[]>([]);
  const [drinkingEvents, setDrinkingEvents] = useState<
    { time: string; size: string }[]
  >([]);
  const [showChart, setShowChart] = useState(false);

  const handleDrinkGlass = () => {
    toast.info("Drank one glass");
    // Retrieve the selected size from local storage
    const selectedSize = localStorage.getItem("selectedSize");

    if (selectedSize) {
      // Update the glassCounts array and setDrinkingEvents
      setGlassCounts((prevCounts) => [...prevCounts, prevCounts.length + 1]);
      // Get the current time in 12-hour format without the date
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      // Store the time and selected glass size of drinking in local storage
      const newDrinkingEvents = [
        ...drinkingEvents,
        { time: currentTime, size: selectedSize },
      ];
      setDrinkingEvents(newDrinkingEvents);
    }
  };

  const handleGenerateChart = () => {
    setShowChart(true);
  };

  const clearLocalStorageAtMidnight = () => {
    const now = new Date();
    if (
      now.getHours() === 0 &&
      now.getMinutes() === 0 &&
      now.getSeconds() === 0
    ) {
      localStorage.clear();
      // You can also add logic to reset state if needed
      setGlassCounts([]);
      setDrinkingEvents([]);
    }
  };

  useEffect(() => {
    const storedGlassCounts = JSON.parse(
      localStorage.getItem("glassCount") ?? "[]"
    );

    if (glassCounts.length > storedGlassCounts?.length) {
      // Update local storage with the new values
      localStorage.setItem("glassCount", JSON.stringify(glassCounts));
      localStorage.setItem("drinkingEvents", JSON.stringify(drinkingEvents));
    }
  }, [glassCounts, drinkingEvents]);

  useEffect(() => {
    // Load glassCounts and drinkingEvents from local storage on component mount
    const storedGlassCounts = localStorage.getItem("glassCount");
    const storedDrinkingEvents = localStorage.getItem("drinkingEvents");
    if (storedGlassCounts) {
      setGlassCounts(JSON.parse(storedGlassCounts));
    }

    if (storedDrinkingEvents) {
      setDrinkingEvents(JSON.parse(storedDrinkingEvents));
    }
  }, []);

  return (
    <>
      <Toaster richColors />
      <div className="p-4 absolute top-0 left-0">
        <h1 className="text-2xl font-semibold text-slate-700">Water Tracker</h1>
      </div>
      <div className="py-16 flex flex-col gap-4 justify-center items-center">
        <div className="flex gap-6">
          <button
            onClick={handleDrinkGlass}
            className="bg-blue-500 text-white text-lg font-semibold rounded-lg flex items-center gap-2 py-4 px-8 hover:bg-blue-500/90 transition-all cursor-pointer"
          >
            <PlusCircle /> Drink a glass
          </button>
        </div>
        <div className="text-center">
          <button
            onClick={handleGenerateChart}
            className="bg-black text-white text-lg font-semibold rounded-lg flex items-center gap-2 py-4 px-8 hover:bg-black/80 transition-all cursor-pointer"
          >
            Generate chart
          </button>
        </div>
      </div>
      <div className="w-full h-[50vh]">
        {showChart && glassCounts.length > 0 && (
          <LineChart
            glassCounts={glassCounts}
            drinkingTimes={drinkingEvents.map((item) => item.time)}
          />
        )}
      </div>
    </>
  );
}

export default Main;
