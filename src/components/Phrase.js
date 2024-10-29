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

  function createGrid(sentence, cols = 12) {
    const availableCols = cols; // No subtraction
    const lines = processSentenceIntoLines(sentence, availableCols);

    const totalRows = lines.length;

    const grid = Array.from({ length: totalRows }, () =>
      Array(cols).fill(null)
    );

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
  // const grid = createGrid('Biednemu zawsze wiatr w oczy i chuj w dupe');

  return (
    <div className="mx-auto p-2 pb-0">
      {grid.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex items-center justify-center gap-[3px] mb-[3px]"
        >
          {row.map((char, charIndex) => (
            <div
              key={charIndex}
              className={`flex items-center justify-center text-[14px] w-[23px] h-[23px] rounded-[4px]
              ${gameInfo.goodLetters.includes(char) && '!bg-white !bg-opacity-100 shadow'}
              ${
                char === null || char === '_'
                  ? 'bg-transparent'
                  : 'bg-white bg-opacity-30'
              }`}
            >
              {char && char !== '_'
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
