import React from 'react';
import { useGameContext } from '../gameContext';

const PlayersInfo = () => {
  const { gameInfo } = useGameContext();

  return (
    <div className="grid grid-cols-4 gap-2 m-2 ">
      {gameInfo.players.map((player, index) => (
        <div
          className={`flex flex-col text-sm rounded-[6px] opacity-60 ${gameInfo.currentPlayer === index && '!opacity-100'}`}
          key={player.name}
        >
          <span
            className={`text-[14px] block text-center bg-blue-400 ${gameInfo.currentPlayer === index && 'text-white'}`}
          >
            {player.name}
          </span>

          <span
            className={`block text-[10px] text-center bg-blue-600 rounded-[3px] mx-2`}
          >
            {player.total}
          </span>

          <span
            className={`block text-[12px] text-center mx-1 bg-blue-400 rounded-[3px] font-semibold ${gameInfo.currentPlayer === index && 'text-white'} `}
          >
            {player.amount}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PlayersInfo;
