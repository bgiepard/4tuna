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
          <div
            className={`h-[30px] w-[60px] pb-5 mx-auto text-[14px] flex flex-col items-center justify-center rounded-[8px] text-center bg-white bg-opacity-25 ${gameInfo.currentPlayer === index && 'text-white bg-orange-400'}`}
          >
            <span className="font-semibold -mt-3">{player.name}</span>
            <span className="text-[10px] -mt-[3px]">{player.total}</span>
          </div>

          <span
            className={`-mt-4 leading-[17px] block text-[12px] text-center mx-1 bg-blue-300 rounded-[3px] h-[16px] font-semibold ${gameInfo.currentPlayer === index && 'text-white bg-orange-300'} `}
          >
            {player.amount}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PlayersInfo;
