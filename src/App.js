import React from 'react';
import PieChart from './components/PieChart';
import Keyboard from './components/Keyboard';
import Phrase from './components/Phrase';
import { useGameContext } from './gameContext';
import PlayersInfo from './components/PlayersInfo';

const App = () => {
  const { gameInfo, rotateWheel, letMeGuess } = useGameContext();

  return (
    <div className="h-full bg-blue-100 max-w-[360px] max-h-[700px] mx-auto flex flex-col pb-2">
      <header className="flex justify-between">
        <span>Kategoria: {gameInfo.category}</span>
        <span>Runda: {gameInfo.round} / 3</span>
      </header>
      <Phrase />

      <div className="flex flex-col items-center flex-grow ">
        <PieChart />
        {gameInfo.guess ? 'ZGADYWANIE' : ''}

        <div className="flex gap-2">
          <button
            onClick={letMeGuess}
            className={`mt-5 p-1 bg-blue-300 rounded mx-auto ${gameInfo.goodLetters.length < 3 && 'opacity-10'}`}
          >
            Odgadnij hasło
          </button>
          <button
            onClick={rotateWheel}
            className={`mt-5 p-1 bg-blue-300 rounded mx-auto ${gameInfo.afterRotate || (gameInfo.guess && 'opacity-10')}`}
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
