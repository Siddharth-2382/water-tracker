import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
    setIsOpen(false);
  };

  // Load selected glass size from local storage on component mount
  useEffect(() => {
    const storedSize = localStorage.getItem("selectedSize");
    if (storedSize) {
      setSelectedSize(storedSize);
    }
  }, []);

  // Update local storage whenever selectedSize changes
  useEffect(() => {
    if (selectedSize) {
      localStorage.setItem("selectedSize", selectedSize);
    }
  }, [selectedSize]);

  return (
    <div className="flex flex-col">
      <button
        onClick={toggleDropdown}
        className="absolute right-0 top-0 m-4 flex gap-1 text-lg font-semibold text-slate-700"
      >
        Glass Size
        <ChevronDown className="h-8 w-8 text-slate-700 text-xl font-semibold cursor-pointer transition delay-200 hover:rotate-180" />
      </button>
      <div
        className={`absolute bg-white text-center font-semibold mr-6 mt-2 text-slate-700 right-0 w-48 rounded-md transition-all ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <p
          className={`p-2 hover:bg-gray-100 cursor-pointer ${
            selectedSize === "200 ML" ? "bg-gray-200" : ""
          }`}
          onClick={() => handleSizeClick("200 ML")}
        >
          200 ML
        </p>
        <p
          className={`p-2 hover:bg-gray-100 cursor-pointer ${
            selectedSize === "250 ML" ? "bg-gray-200" : ""
          }`}
          onClick={() => handleSizeClick("250 ML")}
        >
          250 ML
        </p>
        <p
          className={`p-2 hover:bg-gray-100 cursor-pointer ${
            selectedSize === "300 ML" ? "bg-gray-200" : ""
          }`}
          onClick={() => handleSizeClick("300 ML")}
        >
          300 ML
        </p>
      </div>
    </div>
  );
}

export default Dropdown;
