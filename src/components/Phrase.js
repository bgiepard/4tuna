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

  function createGrid(sentence, cols = 13) {
    const availableCols = cols - 2;
    const lines = processSentenceIntoLines(sentence, availableCols);

    const totalRows = lines.length;

    const grid = Array.from({ length: totalRows }, () =>
      Array(cols).fill(null)
    );

    lines.forEach((line, rowIndex) => {
      const chars = line.split('').map((char) => (char === ' ' ? '_' : char));
      const lineLength = chars.length;
      const padding = Math.floor((availableCols - lineLength) / 2);
      let colIndex = 1 + padding;

      chars.forEach((char) => {
        if (colIndex < cols - 1) {
          grid[rowIndex][colIndex] = char;
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
                char === null || char === '_'
                  ? 'bg-white bg-opacity-15'
                  : 'bg-white text-black'
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
