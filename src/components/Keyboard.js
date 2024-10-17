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
      className={`flex items-center flex-col ${gameInfo.goodGuess && !gameInfo.guess && 'opacity-10'}`}
    >
      {gameInfo.guess ? 'ZGADUJE' : 'false'}
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="">
          {row.map((key, keyIndex) => (
            <button
              key={keyIndex}
              disabled={
                !gameInfo.guess &&
                ([...gameInfo.goodLetters].includes(key) ||
                  [...gameInfo.badLetters].includes(key) ||
                  lowels.includes(key))
              }
              className={`text-[12px] bg-blue-300 px-[11px] py-[4px] m-[1px] text-center rounded 
              ${!gameInfo.guess && lowels.includes(key) && '!bg-blue-200'}
              ${[...gameInfo.goodLetters].includes(key) && '!bg-blue-400'}
              ${[...gameInfo.badLetters].includes(key) && '!bg-blue-400'}
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
