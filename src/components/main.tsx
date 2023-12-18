import { useEffect, useState } from "react";
import LineChart from "./lineChart";
import { Toaster, toast } from "sonner";
import DrinkGlassButton from "./drinkGlassButton";
import GenerateChartButton from "./generateChartButton";
import BarChart from "./barChart";

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
      // get the selected size from local storage
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
      if (glassCounts.length === 0) {
        toast.warning("You must drink at least one glass");
      } else {
        setShowChart(true);
      }
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
    // Load glassCounts and drinkingEvents from local storage
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
      <div className="py-16 flex flex-col md:flex-row lg:flex-row gap-4 justify-center items-center">
        <DrinkGlassButton handleDrinkGlass={handleDrinkGlass} />
        <GenerateChartButton handleGenerateChart={handleGenerateChart} />
      </div>
      {showChart && glassCounts.length > 0 && (
        <>
          <div className="w-[80%] h-[50vh] pb-8">
            <LineChart
              glassCounts={glassCounts}
              drinkingTimes={drinkingEvents.map((item) => item.time)}
            />
          </div>
          <div className="w-[80%] h-[50vh] pb-8">
            <BarChart drinkingEvents={drinkingEvents} />
          </div>
        </>
      )}
    </>
  );
}

export default Main;
