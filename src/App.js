import React from 'react';
import PieChart from './components/PieChart';
import Keyboard from './components/Keyboard';
import Phrase from './components/Phrase';
import PlayersInfo from './components/PlayersInfo';
import Buttons from './components/Buttons';

const App = () => {

  return (
    <div className="h-full bg-gradient-to-b from-blue-500 to-blue-800 py-1 mx-auto flex flex-col max-w-[800px]">

      <Phrase />

      <div className="flex flex-col items-center justify-center flex-grow ">
        <PieChart />
        <Buttons />
      </div>

      <PlayersInfo />

      <Keyboard />
    </div>
  );
};

export default App;
