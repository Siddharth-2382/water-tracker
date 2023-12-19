function GlassCounter({ glassCounts }: { glassCounts: number }) {
  return (
    <div className="text-slate-700 text-center py-12">
      <p className="font-semibold">Glasses of water drank today:</p>
      <h1 className="font-abril-fatface text-8xl">
        <span
          className={`${
            glassCounts <= 3
              ? "text-red-500/90"
              : glassCounts <= 6
              ? "text-orange-400"
              : "text-green-500"
          }`}
        >
          {glassCounts}
          /8
        </span>
      </h1>
      {glassCounts < 8 ? (
        <p className="font-semibold">Drink more water</p>
      ) : (
        <p className="font-semibold">You're doing great!</p>
      )}
    </div>
  );
}

export default GlassCounter;
