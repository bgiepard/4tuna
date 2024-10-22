import React from 'react';
import { useGameContext } from '../gameContext';
import lobby from '../views/Lobby';

const Buttons = () => {
  const { gameInfo, rotateWheel, letMeGuess, nextPlayer } = useGameContext();

  const myUserName = localStorage.getItem(`${gameInfo.gameID}userName`);
  const currentPlayerName = gameInfo.players[gameInfo.currentPlayer]?.name;
  const isMyTurn = currentPlayerName && currentPlayerName === myUserName;

  if (!isMyTurn && currentPlayerName) {
    return (
      <div className="pt-8">
        Poczekaj na swoją kolej, aktualny gracz:{' '}
        {gameInfo.players[gameInfo.currentPlayer].name}
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2 relative z-10 mt-3 h-[36px]">
        <button
          onClick={nextPlayer}
          disabled={gameInfo.mode === 'rotating'}
          className={`p-1 bg-blue-300 rounded mx-auto disabled:opacity-10`}
        >
          Odpuść
        </button>

        <button
          onClick={rotateWheel}
          disabled={gameInfo.mode !== 'rotating' || gameInfo.onlyVowels}
          className={`p-1 px-6 bg-blue-300 rounded mx-auto disabled:opacity-10 ${gameInfo.mode === 'rotating' && 'bg-gradient-to-b from-orange-500 text-white to-orange-300 py-1.5'}`}
        >
          Zakręć
        </button>

        <button
          onClick={letMeGuess}
          className={`p-1 bg-blue-300 rounded mx-auto disabled:opacity-10 `}
          disabled={
            gameInfo.goodLetters.length < 3 || gameInfo.mode === 'guessing'
          }
        >
          Rozwiąż
        </button>
      </div>
    </>
  );
};

export default Buttons;
