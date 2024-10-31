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
        if (currentLine.length > 0) {
          lines.push(currentLine);
        }
        lines.push(word); // Place the long word on its own line
        currentLine = '';
      } else if (currentLine.length === 0) {
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

  function createGrid(sentence, cols = 14) {
    const availableCols = cols; // No subtraction
    const lines = processSentenceIntoLines(sentence, availableCols);

    const totalRows = lines.length;

    const grid = Array.from({ length: totalRows }, () => Array(cols).fill(null));

    lines.forEach((line, rowIndex) => {
      const chars = line.split('').map((char) => (char === ' ' ? '_' : char));
      const lineLength = chars.length;
      let colIndex = Math.max(0, Math.floor((availableCols - lineLength) / 2)); // Start from padding, not 1 + padding

      chars.forEach((char) => {
        if (colIndex < cols) {
          // Adjusted boundary condition
          grid[rowIndex][colIndex] = char;
          colIndex++;
        }
      });
    });

    return grid;
  }

  const grid = createGrid(gameInfo.phrase);
  // const grid = createGrid('Król Karol kupił królowej Karolinie korale koloru koralowego');

  return (
    <div className="p-1">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-[3px] mb-[3px] justify-center">
          {row.map((char, charIndex) => (
            <div
              key={charIndex}
              className={`flex items-center justify-center text-[14px] rounded-[6px] h-[28px] w-full max-w-[28px]
              ${gameInfo.goodLetters.includes(char) && '!bg-[#E4BC45] !bg-opacity-100 shadow text-white'}
              ${char === null || char === '_' ? 'bg-transparent border-[1px] border-blue-200 border-opacity-20' : 'bg-white bg-opacity-40 font-semibold'}`}
            >
              {char && char !== '_' ? (gameInfo.goodLetters.includes(char) ? char : '') : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Phrase;
