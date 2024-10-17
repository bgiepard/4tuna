import React from 'react';
import PieChart from './components/PieChart';
import Keyboard from './components/Keyboard';
import Phrase from './components/Phrase';
import { useGameContext } from './gameContext';
import PlayersInfo from './components/PlayersInfo';

const App = () => {
  const { gameInfo, rotateWheel, letMeQuest } = useGameContext();

  return (
    <div className="h-full bg-blue-100 max-w-[360px] max-h-[700px] mx-auto flex flex-col pb-2">
      {/*<header className="flex justify-between">*/}
      {/*  <span>Kategoria: {gameInfo.category}</span>*/}
      {/*  <span>Runda: {gameInfo.round} / 3</span>*/}
      {/*</header>*/}
      <Phrase phrase={gameInfo.phrase} />

      <div className="flex flex-col items-center flex-grow ">
        <PieChart />
        {gameInfo.guess ? 'ZGADYWANIE' : ''}

        <div className="flex gap-2">
          <button
            onClick={letMeQuest}
            className="mt-5 p-1 bg-blue-300 rounded mx-auto"
          >
            Odgadnij hasło
          </button>
          <button
            onClick={rotateWheel}
            className="mt-5 p-1 bg-blue-300 rounded mx-auto"
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
