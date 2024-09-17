import { useCallback, useState } from "react";
import { COLS, DIRECTIONS, ROWS, createEmptyGrid } from "./utils/utils";
import { twMerge } from "tailwind-merge";
import React from "react";
import { PlayPauseButton } from "./components/PlayPauseButton";
import { Button } from "./components/Button";

function App() {
  const [grid, setGrid] = useState<number[][]>(createEmptyGrid());
  const [isPlaying, setIsPlaying] = useState(false);

  const playingRef = React.useRef(isPlaying);
  playingRef.current = isPlaying;

  const runGameOfLife = useCallback(() => {
    if (!playingRef.current) {
      return;
    }

    setGrid((currentGrid) => {
      const newGrid = currentGrid.map((arr) => [...arr]);

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          let liveNeighbors = 0;

          DIRECTIONS.forEach(([directionX, directionY]) => {
            const neighborRow = row + directionX;
            const neighborCol = col + directionY;

            if (
              neighborRow >= 0 &&
              neighborRow < ROWS &&
              neighborCol >= 0 &&
              neighborCol < COLS
            ) {
              liveNeighbors += currentGrid[neighborRow][neighborCol] ? 1 : 0;
            }
          });

          if (liveNeighbors < 2 || liveNeighbors > 3) {
            newGrid[row][col] = 0;
          } else if (currentGrid[row][col] === 0 && liveNeighbors === 3) {
            newGrid[row][col] = 1;
          }
        }
      }

      return newGrid;
    });

    setTimeout(runGameOfLife, 100);
  }, [playingRef, setGrid]);

  return (
    <>
      <div className="h-screen w-screen flex items-center p-4  flex-col gap-4">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#a333ee_100%)]"></div>

        <h1 className="md:text-2xl text-xl">Conway's Game of Life</h1>
        <div className="flex gap-4 items-center">
          <PlayPauseButton
            isPlaying={isPlaying}
            onClick={() => {
              setIsPlaying(!isPlaying);
              if (!isPlaying) {
                playingRef.current = true;
                // run simulation here
                runGameOfLife();
              }
            }}
          />
          <Button
            onClick={() => {
              const rows = [];
              for (let i = 0; i < ROWS; i++) {
                rows.push(
                  Array.from(Array(COLS), () => (Math.random() > 0.75 ? 1 : 0))
                );
              }
              setGrid(rows);
            }}
          >
            Seed
          </Button>
          <Button
            onClick={() => {
              setGrid(createEmptyGrid());
              setIsPlaying(false);
            }}
          >
            Clear
          </Button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${COLS}, 20px)`,
            gridTemplateRows: `repeat(${ROWS}, 20px)`,
          }}
        >
          {grid.map((rows, originalRowIndex) =>
            rows.map((_col, originalColIndex) => (
              <button
                key={`${originalRowIndex}-${originalColIndex}`}
                className={twMerge(
                  "border border-[#9050e9]",
                  grid[originalRowIndex][originalColIndex]
                    ? "bg-[#ad7bee]"
                    : "bg-[#240643]"
                )}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
