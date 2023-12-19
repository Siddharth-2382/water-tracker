import { useEffect, useState } from "react";
import LineChart from "./lineChart";
import { Toaster, toast } from "sonner";
import DrinkGlassButton from "./drinkGlassButton";
import GenerateChartButton from "./generateChartButton";
import BarChart from "./barChart";

function Main() {
  const [glassCounts, setGlassCounts] = useState<number>(0);
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
        setGlassCounts((prevCounts) => prevCounts + 1);
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
      if (glassCounts === 0) {
        toast.warning("You must drink at least one glass");
      } else {
        if (!showChart) {
          setShowChart(true);
        } else {
          toast("Charts are available");
        }
      }
    } else {
      toast.error("You must select a glass size");
    }
  };

  useEffect(() => {
    const storedGlassCounts = Number(
      JSON.parse(localStorage.getItem("glassCount") ?? "0")
    );

    if (glassCounts > storedGlassCounts) {
      // Update local storage with the new values
      localStorage.setItem("glassCount", JSON.stringify(glassCounts));
      localStorage.setItem("drinkingEvents", JSON.stringify(drinkingEvents));
    }
  }, [glassCounts, drinkingEvents]);

  useEffect(() => {
    // Load glassCounts and drinkingEvents from local storage
    const storedGlassCounts = Number(localStorage.getItem("glassCount"));
    const storedDrinkingEvents = localStorage.getItem("drinkingEvents");

    // Check if it's a new day
    const today = new Date().toLocaleDateString();
    const lastStoredDate = localStorage.getItem("lastStoredDate");

    if (!lastStoredDate || lastStoredDate !== today) {
      // Reset storage for a new day
      localStorage.setItem("lastStoredDate", today);
      localStorage.removeItem("glassCount");
      localStorage.removeItem("drinkingEvents");
      setGlassCounts(0);
      setDrinkingEvents([]);
      return;
    }

    // update states based on local storage values
    if (storedGlassCounts) {
      setGlassCounts(storedGlassCounts);
    }
    if (storedDrinkingEvents) {
      setDrinkingEvents(JSON.parse(storedDrinkingEvents));
    }
  }, []);

  return (
    <>
      <Toaster richColors />
      <div className="px-4 pt-2">
        <h1 className="text-4xl font-extrabold text-slate-700">
          Water Tracker
        </h1>
      </div>
      <div className="pb-16 pt-8 flex flex-col md:flex-row lg:flex-row gap-4 justify-center items-center">
        <DrinkGlassButton handleDrinkGlass={handleDrinkGlass} />
        <GenerateChartButton handleGenerateChart={handleGenerateChart} />
      </div>
      {showChart && glassCounts > 0 && (
        <>
          <div className="w-[100%] md:w-[80%] lg:w-[80%] h-[50vh] pb-8">
            <LineChart drinkingEvents={drinkingEvents} />
          </div>
          <div className="w-[100%] md:w-[80%] lg:w-[80%] h-[50vh] pb-8">
            <BarChart drinkingEvents={drinkingEvents} />
          </div>
        </>
      )}
    </>
  );
}

export default Main;
