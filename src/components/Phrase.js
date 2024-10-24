import React from 'react';
import { useGameContext } from '../gameContext';

const Phrase = () => {
  const { gameInfo } = useGameContext();

  function processSentenceIntoLines(sentence, maxCharsPerLine) {
    const words = sentence.toUpperCase().split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach((word) => {
      if (word.length > maxCharsPerLine) {
        // Handle words longer than maxCharsPerLine
        if (currentLine.length > 0) {
          lines.push(currentLine);
        }
        lines.push(word); // Place the long word on its own line
        currentLine = '';
      } else if (currentLine.length === 0) {
        // Start a new line with the word
        currentLine = word;
      } else if (currentLine.length + 1 + word.length <= maxCharsPerLine) {
        // Add word to current line
        currentLine += ' ' + word;
      } else {
        // Word doesn't fit, move to next line
        lines.push(currentLine);
        currentLine = word;
      }
    });

    // Add the last line
    if (currentLine.length > 0) {
      lines.push(currentLine);
    }

    return lines;
  }

  function createGrid(sentence, cols = 13) {
    // Calculate the maximum number of characters per line
    const availableCols = cols - 2; // Exclude 1 blue tile on each side
    const maxCharsPerLine = availableCols;

    // Process the sentence into lines without breaking words
    const lines = processSentenceIntoLines(sentence, maxCharsPerLine);

    // Number of rows is exactly the number of lines (no extra rows)
    const totalRows = lines.length;

    // Initialize the grid with nulls (blue tiles)
    const grid = Array.from({ length: totalRows }, () =>
      Array(cols).fill(null)
    );

    // Place the lines into the grid starting from row index 0
    lines.forEach((line, rowIndex) => {
      const chars = line.split('').map((char) => (char === ' ' ? 'X' : char));
      const lineLength = chars.length;
      const padding = Math.floor((availableCols - lineLength) / 2);
      let colIndex = 1 + padding; // Start from column index 1 + padding to center

      chars.forEach((char) => {
        if (colIndex < cols - 1) {
          grid[rowIndex][colIndex] = char; // Place character in the grid
          colIndex++;
        }
      });
    });

    return grid;
  }

  const grid = createGrid(gameInfo.phrase);
  // const grid = createGrid('Gdzie kucharek sześć tam nie ma co jeśc');

  return (
    <div className="">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-13 gap-[4px] mb-[4px]">
          {row.map((char, charIndex) => (
            <div
              key={charIndex}
              className={`flex items-center justify-center text-[14px] min-h-[24px] rounded-[2px]
              ${gameInfo.goodLetters.includes(char) && 'bg-gradient-to-b from-orange-500 text-white to-orange-300'}
              ${
                char === null || char === 'X'
                  ? 'bg-white bg-opacity-15'
                  : 'bg-white text-black'
              }`}
            >
              {char && char !== 'X'
                ? gameInfo.goodLetters.includes(char)
                  ? char
                  : ''
                : ''}
            </div>
          ))}
        </div>
      ))}
      <div className="flex items-center justify-between">
        <span className="flex items-center justify-center  rounded t text-white uppercase">
          {gameInfo.category}
        </span>
        <span className="flex items-center justify-center  rounded  text-white ">
          Runda&nbsp;
          <span className="text-orange-300 font-bold"> {gameInfo.round}</span>
          &nbsp;/ {gameInfo.maxRounds}
        </span>
      </div>
    </div>
  );
};

export default Phrase;
