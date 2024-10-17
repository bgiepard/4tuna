import React from 'react';
import { useGameContext } from '../gameContext';

const Phrase = () => {
  const { gameInfo } = useGameContext();

  function processSentence(sentence) {
    // Split sentence into words and build rows with a max of 12 characters per row
    const words = sentence.split(' ');
    let rows = [];
    let currentRow = '';

    words.forEach((word) => {
      if (currentRow.length + word.length + 1 <= 12) {
        currentRow += (currentRow ? ' ' : '') + word;
      } else {
        rows.push(currentRow);
        currentRow = word;
      }
    });

    // Add the last row if it's not empty
    if (currentRow) rows.push(currentRow);

    // Split each row into characters, replacing spaces with 'X'
    return rows.map((row) =>
      row.split('').map((char) => (char === ' ' ? 'X' : char.toUpperCase()))
    );
  }

  const processedRows = processSentence(gameInfo.phrase);

  return (
    <div className="flex items-center flex-col p-2">
      <span>Powiedzenia</span>
      {processedRows.map((row, rowIndex) => (
        <div key={rowIndex} className="">
          {row.map((char, charIndex) => (
            <button
              key={charIndex}
              className={`text-[12px] bg-white px-[8px] py-[3px] m-[2px] text-center rounded ${['X'].includes(char) && '!opacity-0'}`}
            >
              {gameInfo.goodLetters.includes(char) ? char : '_'}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Phrase;
