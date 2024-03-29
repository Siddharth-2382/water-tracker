import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { GLASS_SIZES } from "../constants/constants";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
    setIsOpen(false);
  };

  // Load selected glass size from local storage
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
    <>
      <div>
        <h1 className="absolute left-0 top-0 m-4 flex gap-1 text-lg font-semibold text-slate-700">
          WT
        </h1>
      </div>
      <div className="flex flex-col">
        <button
          onClick={toggleDropdown}
          className="absolute right-0 top-0 m-4 flex gap-1 text-lg font-semibold text-slate-700"
        >
          Glass Size
          <ChevronDown
            className={`h-8 w-8 text-slate-700 text-xl font-semibold cursor-pointer transition delay-10 ${
              isOpen && "rotate-180"
            }`}
          />
        </button>
        <div
          className={`absolute bg-blue-200 overflow-hidden text-center font-semibold mr-6 mt-2 text-slate-700 right-0 w-48 rounded-md transition delay-300 ${
            isOpen ? "block opacity-1" : "hidden opacity-0"
          }`}
        >
          {GLASS_SIZES.map((size) => (
            <p
              key={size}
              className={`p-2 hover:bg-blue-300/50 cursor-pointer ${
                selectedSize === size ? "bg-blue-400/50" : ""
              }`}
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;
