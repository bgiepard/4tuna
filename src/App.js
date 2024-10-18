import React from 'react';
import PieChart from './components/PieChart';
import Keyboard from './components/Keyboard';
import Phrase from './components/Phrase';
import { useGameContext } from './gameContext';
import PlayersInfo from './components/PlayersInfo';

const App = () => {
  const { gameInfo, rotateWheel, letMeGuess, nextPlayer } = useGameContext();

  return (
    <div className="h-full bg-blue-500  mx-auto flex flex-col max-w-[800px]">
      <Phrase />

      <div className="flex flex-col items-center flex-grow ">
        <PieChart />

        <div className="flex gap-2">
          <button
            onClick={nextPlayer}
            className={`mt-5 p-1 bg-blue-300 rounded mx-auto `}
          >
            Kup samogłoskę
          </button>
          {gameInfo.onlyVowels && (
            <button
              onClick={nextPlayer}
              className={`mt-5 p-1 bg-blue-300 rounded mx-auto ${gameInfo.goodLetters.length < 3 && 'opacity-10'}`}
            >
              Odpuść
            </button>
          )}
          <button
            onClick={letMeGuess}
            className={`mt-5 p-1 bg-blue-300 rounded mx-auto ${gameInfo.goodLetters.length < 3 && 'opacity-10'}`}
          >
            Rozwiąż
          </button>
          <button
            onClick={rotateWheel}
            className={`mt-5 p-1 bg-blue-300 rounded mx-auto ${(gameInfo.afterRotate || gameInfo.onlyVowels || gameInfo.guess) && 'opacity-10'}`}
          >
            Zakręć
          </button>
          {/*<button*/}
          {/*  onClick={() => {}}*/}
          {/*  className="mt-5 p-1 bg-blue-300 rounded mx-auto"*/}
          {/*>*/}
          {/*  Kup samogłoskę*/}
          {/*</button>*/}
        </div>
      </div>

      <PlayersInfo />

      <Keyboard />
    </div>
  );
};

export default App;
