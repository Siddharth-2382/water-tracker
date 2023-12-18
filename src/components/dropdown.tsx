import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { GLASS_SIZES } from "../constants/constants";

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
        {GLASS_SIZES.map((size) => (
          <p
            key={size}
            className={`p-2 hover:bg-gray-100 cursor-pointer ${
              selectedSize === size ? "bg-gray-200" : ""
            }`}
            onClick={() => handleSizeClick(size)}
          >
            {size}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Dropdown;
