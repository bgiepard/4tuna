import React from 'react';
import { useGameContext } from '../gameContext';

const PlayersInfo = () => {
  const { gameInfo } = useGameContext();

  return (
    <div className={`flex -mx-2`}>
      {gameInfo.players.map((player, index) => (
        <div
          className={`flex flex-col flex-grow opacity-60 pt-2 pb-2 ${gameInfo.currentPlayer === index && '!opacity-100 rounded-lg bg-black bg-opacity-25'}`}
          key={player.name}
        >
          <div
            className={`mx-auto text-[14px] flex flex-col items-center justify-center text-center text-gray-500 ${gameInfo.currentPlayer === index && '!text-white'}`}
          >
            <span className="mb-1">{player.name}</span>
            {/*<span className="text-[10px] -mt-[3px]">{player.total}</span>*/}
          </div>

          <span
            className={`block p-0 w-4/5 mx-auto text-[12px] leading-[12px] pt-1 pb-0.5 text-center rounded-[3px] text-gray-400 ${gameInfo.currentPlayer === index && 'ring-2 ring-orange-500 !text-white '} `}
          >
            {player.amount}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PlayersInfo;
