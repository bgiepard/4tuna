import React from 'react';
import { useGameContext } from '../gameContext';

const PlayersInfo = () => {
  const { gameInfo } = useGameContext();

  return (
    <div className={`w-full h-full`}>
      {/*${index === 1 && gameInfo.players.length < 3 ? 'absolute right-0 bottom-0 bg-black' : 'left-0 top-0 bottom-auto right-auto'}*/}
      {/*${index === 2 && 'absolute left-0 top-0 bg-black'}*/}
      {/*${index === 3 && 'absolute right-0 top-0 bg-black'}*/}
      {gameInfo.players.map((player, index) => (
        <div
          className={`flex items-center justify-between pt-1 pb-1 min-w-[90px] pr-4 m-4 bg-[#6D42DA] opacity-70 rounded-[10px] ${gameInfo.currentPlayer === index && '!opacity-100 bg-[#E4BC45] shadow-xl'}
          ${index === 0 && 'absolute left-0 bottom-0 '}
          ${index === 1 && 'absolute right-0 bottom-0'}
          ${index === 1 && gameInfo.players.length > 2 && 'absolute right-auto bottom-auto top-0 left-0'}
          ${index === 2 && 'absolute right-0 top-0'}
          ${index === 3 && 'absolute right-0 bottom-0'}
          `}
          key={player.id}
        >
          <div className="w-[25px] h-[25px] bg-white rounded-full ml-2 mr-2"></div>
          <div className="flex flex-col grow">
            <div
              className={`mx-auto text-[14px] flex flex-col items-center justify-center text-center text-blue-500 overflow-hidden ${gameInfo.currentPlayer === index && '!text-white'}`}
            >
              <span className="block truncate">
                {/*<span*/}
                {/*  className={`w-[6px] h-[6px] rounded-full inline-block mr-1 -translate-y-[1px] ${player.connected ? 'bg-green-400' : 'bg-red-500'}`}*/}
                {/*></span>*/}
                <span className="truncate">{player.name}</span>
              </span>
            </div>

            <span
              className={`block p-0 w-4/5 mx-auto text-[16px] leading-[12px] pt-1 pb-0.5 text-center rounded-[3px] text-gray-400 ${gameInfo.currentPlayer === index && '!text-white font-semibold'} `}
            >
              {player.amount}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayersInfo;
