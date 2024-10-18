import React from 'react';
import { useGameContext } from '../gameContext';

const Keyboard = () => {
  const { gameInfo, letterClick, lowels } = useGameContext();

  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ['Ą', 'Ć', 'Ę', 'Ł', 'Ń', 'Ó', 'Ś', 'Ź', 'Ż'],
  ];

  const handleKeyClick = (key) => {
    letterClick(key);
  };

  return (
    <div
      // className={`flex items-center flex-col ${gameInfo.goodGuess && !gameInfo.guess && 'opacity-10'} border border-red-500`}
      className={`flex items-center flex-col  border border-red-500 p-1`}
    >
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="w-full flex items-center justify-center">
          {row.map((key, keyIndex) => (
            <button
              key={keyIndex}
              disabled={
                !gameInfo.guess &&
                ([...gameInfo.goodLetters].includes(key) ||
                  [...gameInfo.badLetters].includes(key) ||
                  lowels.includes(key))
              }
              className={` bg-blue-300 text-center rounded w-[9%] m-[0.5%] p-0 py-1
              ${!gameInfo.guess && lowels.includes(key) && '!opacity-40 !text-opacity-40'}
              ${[...gameInfo.goodLetters].includes(key) && '!bg-blue-500 ring-blue-300 ring-2 text-blue-300'}
              ${[...gameInfo.badLetters].includes(key) && '!bg-blue-500 ring-blue-300 ring-2 text-blue-300'}
              `}
              onClick={() => handleKeyClick(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
