import React from 'react';
import PieChart from './components/PieChart';
import Keyboard from './components/Keyboard';
import Phrase from './components/Phrase';
import { useGameContext } from './gameContext';
import PlayersInfo from './components/PlayersInfo';
import Buttons from './components/Buttons';

const App = () => {
  const { gameInfo, rotateWheel, letMeGuess, nextPlayer } = useGameContext();

  return (
    <div className="h-full bg-gradient-to-b from-blue-500 to-blue-800 py-1 mx-auto flex flex-col max-w-[800px]">
      <div className="flex items-center justify-between px-2 mt-1 -mb-5 z-10">
        <span className="flex items-center justify-center bg-blue-400 rounded text-[12px] w-[98px] h-[20px] text-white">
          {gameInfo.category}
        </span>
        <span className="flex items-center justify-center bg-blue-400 rounded text-[12px] w-[73px] h-[20px] text-white">
          Runda {gameInfo.round} / 3
        </span>
      </div>
      <Phrase />

      <div className="flex flex-col items-center flex-grow ">
        <PieChart />
        <Buttons />
      </div>

      <PlayersInfo />

      <Keyboard />
    </div>
  );
};

export default App;
