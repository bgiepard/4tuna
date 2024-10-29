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
      className={`flex items-center flex-col  ${(gameInfo.mode === 'rotating' || !isMyTurn) && 'pointer-events-none opacity-30'}`}
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
              className={`shadow-lg w-[40px] mx-[4px] my-[6px] h-[36px] p-0 text-center rounded-[4px] text-white leading-[32px] text-[18px] bg-white bg-opacity-30

              ${gameInfo.mode !== 'guessing' && gameInfo.vowels.includes(key) && '!bg-opacity-5 text-opacity-50 !shadow-none'}
              ${[...gameInfo.goodLetters].includes(key) && '!shadow-none !bg-blue-800 !text-pink-300 !bg-opacity-40'}
              ${[...gameInfo.badLetters].includes(key) && '!shadow-none !bg-blue-800 !text-pink-300 !bg-opacity-40'}
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
