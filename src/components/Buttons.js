import React from 'react';
import { useGameContext } from '../gameContext';

const Buttons = () => {
  const { rotateWheel, letMeGuess, nextPlayer } = useGameContext();

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={nextPlayer}
          className={`mt-5 p-1 bg-blue-300 rounded mx-auto `}
        >
          Odpuść
        </button>

        <button
          onClick={rotateWheel}
          className={`mt-5 p-1 px-6 bg-blue-300 rounded mx-auto  `}
        >
          Zakręć
        </button>

        <button
          onClick={letMeGuess}
          className={`mt-5 p-1 bg-blue-300 rounded mx-auto `}
        >
          Rozwiąż
        </button>
      </div>
    </>
  );
};

export default Buttons;
