import React from 'react';
import { useGameContext } from '../gameContext';
import socket from '../socket';

const Keyboard = () => {
  const { gameInfo, letterClick } = useGameContext();

  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ['Ą', 'Ć', 'Ę', 'Ł', 'Ń', 'Ó', 'Ś', 'Ź', 'Ż'],
  ];

  const handleKeyClick = (key) => {
    letterClick(gameInfo.gameID, key);
  };

  const currentPlayer = gameInfo.players[gameInfo.currentPlayer]?.id;
  const isMyTurn = currentPlayer && currentPlayer === socket.id;

  return (
    <div
      className={`flex items-center flex-col -mx-2 ${(gameInfo.mode === 'rotating' || !isMyTurn) && 'pointer-events-none opacity-30'}`}
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
              className={`bg-[#3E3B3B] text-center rounded w-1/12 m-[6px] h-[33px] p-0 text-white leading-[32px] text-[18px]
              ${['Ą', 'Ć', 'Ę', 'Ł', 'Ś', 'Ć', 'Ó', 'Ń', 'Ź', 'Ż'].includes(key) && '!bg-red-500'}
              ${gameInfo.mode !== 'guessing' && gameInfo.vowels.includes(key) && '!bg-opacity-30 text-opacity-20'}
              ${[...gameInfo.goodLetters].includes(key) && '!bg-opacity-30'}
              ${[...gameInfo.badLetters].includes(key) && '!bg-opacity-30'}
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
