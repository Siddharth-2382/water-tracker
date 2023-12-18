import { useEffect, useState } from "react";
import LineChart from "./lineChart";
import { Toaster, toast } from "sonner";
import DrinkGlassButton from "./drinkGlassButton";
import GenerateChartButton from "./generateChartButton";

function Main() {
  const [glassCounts, setGlassCounts] = useState<number[]>([]);
  const [drinkingEvents, setDrinkingEvents] = useState<
    { time: string; size: string }[]
  >([]);
  const [showChart, setShowChart] = useState(false);

  const handleDrinkGlass = () => {
    if (!localStorage.getItem("selectedSize")) {
      toast.error("You must select a glass size first");
    } else {
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
    }
  };

  const handleGenerateChart = () => {
    if (localStorage.getItem("selectedSize")) {
      setShowChart(true);
    } else {
      toast.error("You must select a glass size");
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
        <h1 className="text-lg font-semibold text-slate-700">Water Tracker</h1>
      </div>
      <div className="py-16 flex flex-col gap-4 justify-center items-center">
        <DrinkGlassButton handleDrinkGlass={handleDrinkGlass} />
        <GenerateChartButton handleGenerateChart={handleGenerateChart} />
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
