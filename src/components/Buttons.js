import React from 'react';
import { useGameContext } from '../gameContext';

const Buttons = () => {
  const { gameInfo, rotateWheel, letMeGuess, nextPlayer } = useGameContext();

  return (
    <>
      <div className="flex gap-2 relative z-10">
        <button
          onClick={nextPlayer}
          disabled={gameInfo.mode === 'rotating'}
          className={`mt-5 p-1 bg-blue-300 rounded mx-auto disabled:opacity-10`}
        >
          Odpuść
        </button>

        <button
          onClick={rotateWheel}
          disabled={gameInfo.mode !== 'rotating'}
          className={`mt-5 p-1 px-6 bg-blue-300 rounded mx-auto disabled:opacity-10 ${gameInfo.mode === 'rotating' && 'bg-green-400'}`}
        >
          Zakręć
        </button>

        <button
          onClick={letMeGuess}
          className={`mt-5 p-1 bg-blue-300 rounded mx-auto disabled:opacity-10 `}
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
