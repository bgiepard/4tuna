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

  function createGrid(sentence, cols = 16) {
    // Calculate the maximum number of characters per line
    const availableCols = cols - 2; // Exclude 1 blue tile on each side
    const maxCharsPerLine = availableCols;

    // Process the sentence into lines without breaking words
    const lines = processSentenceIntoLines(sentence, maxCharsPerLine);

    // Number of rows is lines.length + 2 (for the empty blue lines above and below)
    const totalRows = lines.length + 2;

    // Initialize the grid with nulls (blue tiles)
    const grid = Array.from({ length: totalRows }, () =>
      Array(cols).fill(null)
    );

    // Place the lines into the grid starting from row index 1 (leaving top empty line)
    lines.forEach((line, rowIndex) => {
      const chars = line.split('').map((char) => (char === ' ' ? 'X' : char));
      const lineLength = chars.length;
      const padding = Math.floor((availableCols - lineLength) / 2);
      let colIndex = 1 + padding; // Start from column index 1 + padding to center

      chars.forEach((char) => {
        if (colIndex < cols - 1) {
          grid[rowIndex + 1][colIndex] = char;
          colIndex++;
        }
      });
    });

    return grid;
  }

  const grid = createGrid(gameInfo.phrase);

  return (
    <div className="px-2 mb-4">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-16 gap-[2px] mb-[2px] ">
          {row.map((char, charIndex) => (
            <div
              key={charIndex}
              className={`flex items-center justify-center text-[12px] h-[20px] rounded-[4px]
              ${gameInfo.goodLetters.includes(char) && 'bg-yellow-400'}
              ${
                char === null || char === 'X'
                  ? 'bg-blue-400'
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
    </div>
  );
};

export default Phrase;
