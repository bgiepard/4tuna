import React from 'react';
import { useGameContext } from '../gameContext';

const Keyboard = () => {
  const { gameInfo, letterClick } = useGameContext();

  const rows = [
    ['Ń', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Ó'],
    ['Ą', 'Ś', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ł'],
    ['Ę', 'Ć', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Ź', 'Ż'],
    // ['Ą', 'Ć', 'Ę', 'Ł', 'Ń', 'Ó', 'Ś', 'Ź', 'Ż'],
  ];

  const handleKeyClick = (key) => {
    letterClick(gameInfo.gameID, key);
  };

  const myUserName = localStorage.getItem(`${gameInfo.gameID}userName`);
  const currentPlayerName = gameInfo.players[gameInfo.currentPlayer]?.name;
  const isMyTurn = currentPlayerName && currentPlayerName === myUserName;

  return (
    <div
      className={`flex items-center flex-col ${(gameInfo.mode === 'rotating' || !isMyTurn) && 'pointer-events-none opacity-100'}`}
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
                  gameInfo.vowels.includes(key))
              }
              className={`bg-[#3E3B3B] text-center rounded w-[20px] m-[3px] h-[28px] p-0 text-white leading-[32px] text-[18px]
              ${['Ą', 'Ć', 'Ę', 'Ł', 'Ś', 'Ć', 'Ó', 'Ń', 'Ź', 'Ż'].includes(key) && '!bg-red-500'}
              ${gameInfo.mode !== 'guessing' && gameInfo.vowels.includes(key) && '! !bg-opacity-30 text-opacity-20'}
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
