import React from 'react';
import { useGameContext } from '../gameContext';

const PlayersInfo = () => {
  const { gameInfo } = useGameContext();

  return (
    <div className={`flex gap-2 m-2 mb-2.5`}>
      {gameInfo.players.map((player, index) => (
        <div
          className={`flex flex-col text-sm flex-grow rounded-[6px] opacity-60 ${gameInfo.currentPlayer === index && '!opacity-100'}`}
          key={player.name}
        >
          <div
            className={`h-[30px] w-2/3 pb-5 mx-auto text-[14px] flex flex-col items-center justify-center rounded-[4px] text-center bg-white bg-opacity-25 ${gameInfo.currentPlayer === index && 'text-white bg-orange-400'}`}
          >
            <span className="font-semibold -mt-3">{player.name}</span>
            <span className="text-[10px] -mt-[3px]">{player.total}</span>
          </div>

          <span
            className={`-mt-4 leading-[19px] block text-[16px] text-blue-900 text-center mx-1 bg-blue-300 rounded-[3px] h-[18px] font-semibold ${gameInfo.currentPlayer === index && 'bg-gradient-to-b from-orange-500 !text-white to-orange-300'} `}
          >
            {player.amount}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PlayersInfo;
