import React from 'react';
import { useGameContext } from '../gameContext';

const Keyboard = () => {
  const { gameInfo, letterClick, vowels } = useGameContext();

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
      className={`flex items-center flex-col p-1 ${gameInfo.mode === 'rotating' && 'pointer-events-none opacity-10'}`}
    >
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="w-full flex items-center justify-center">
          {row.map((key, keyIndex) => (
            <button
              key={keyIndex}
              disabled={
                (gameInfo.mode !== 'guessing' ||
                  (gameInfo.mode === 'rotating' && gameInfo.onlyVowels)) &&
                ([...gameInfo.goodLetters].includes(key) ||
                  [...gameInfo.badLetters].includes(key) ||
                  vowels.includes(key))
              }
              className={` bg-blue-300 text-center rounded w-[9%] m-[0.5%] p-0 py-1 shadow-blue-900 shadow
              ${gameInfo.mode !== 'guessing' && vowels.includes(key) && '!bg-blue-400  text-blue-100 opacity-65 shadow-none'}
              ${[...gameInfo.goodLetters].includes(key) && '!bg-blue-400 text-blue-100 opacity-65 shadow-none'}
              ${[...gameInfo.badLetters].includes(key) && '!bg-blue-400 text-blue-100 opacity-65 shadow-none'}
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
