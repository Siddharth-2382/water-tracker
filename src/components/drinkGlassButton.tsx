import { PlusCircle } from "lucide-react";

function DrinkGlassButton({
  handleDrinkGlass,
}: {
  handleDrinkGlass: () => void;
}) {
  return (
    <div className="flex gap-6">
      <button
        onClick={handleDrinkGlass}
        className="bg-blue-500 text-white text-lg font-semibold rounded-lg flex items-center gap-2 py-4 px-8 hover:bg-blue-500/90 transition-all cursor-pointer"
      >
        <PlusCircle /> Drink a glass
      </button>
    </div>
  );
}

export default DrinkGlassButton;
