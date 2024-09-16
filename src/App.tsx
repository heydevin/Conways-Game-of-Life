import { useState } from "react";
import { COLS, ROWS, createEmptyGrid } from "./utils/utils";
import { twMerge } from "tailwind-merge";

function App() {
  const [grid, setGrid] = useState<number[][]>(createEmptyGrid());

  return (
    <>
      <div className="h-screen w-screen flex justify-center p-4 bg-blue-500 flex-col gap-4">
        <h1 className="md:text-2xl text-xl">Conway's Game of Life</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${COLS}, 20px)`,
            gridTemplateRows: `repeat(${ROWS}, 20px)`,
          }}
        >
          {grid.map((rows, originalRowIndex) =>
            rows.map((col, originalColIndex) => (
              <button
                key={`${originalRowIndex}-${originalColIndex}`}
                className={
                  (twMerge("border border-[#9050e9]"),
                  grid[originalRowIndex][originalColIndex]
                    ? "bg-[#ad7bee]"
                    : "bg-[#240643]")
                }
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
