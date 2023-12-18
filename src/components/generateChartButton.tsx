function GenerateChartButton({
  handleGenerateChart,
}: {
  handleGenerateChart: () => void;
}) {
  return (
    <div className="text-center">
      <button
        onClick={handleGenerateChart}
        className="bg-black text-white text-lg font-semibold rounded-lg flex items-center gap-2 py-4 px-8 hover:bg-black/80 transition-all cursor-pointer"
      >
        Generate chart
      </button>
    </div>
  );
}

export default GenerateChartButton;
