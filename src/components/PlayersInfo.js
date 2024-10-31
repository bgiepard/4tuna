import React, { useState, useEffect } from 'react';
import { useGameContext } from '../gameContext';

const PlayerInfo = ({ player, index, isCurrentPlayer }) => {
  const [prevAmount, setPrevAmount] = useState(player.amount);
  const [amountChange, setAmountChange] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (player.amount !== prevAmount) {
      const diff = player.amount - prevAmount;
      setAmountChange(diff);
      setShowTooltip(true);
      setPrevAmount(player.amount);

      // Hide the tooltip after 1 second
      const timeout = setTimeout(() => {
        setShowTooltip(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [player.amount]);

  return (
    <div
      className={`flex flex-col items-center justify-between pt-1 pb-1 w-full mx-2  bg-[#6D42DA] opacity-70 rounded-[10px] ${!player.connected && '!opacity-10 bg-red-500'} ${
        isCurrentPlayer && '!opacity-100 bg-[#E4BC45] shadow-xl'
      } `}
    >
      <div className="flex flex-col grow relative">
        <div
          className={`mx-auto text-[14px] flex flex-col items-center justify-center text-center text-blue-500 overflow-hidden ${
            isCurrentPlayer && '!text-white'
          }`}
        >
          <span className="block truncate">
            <span className="truncate">{player.name}</span>
          </span>
        </div>
        {/*<div className="w-[25px] h-[25px] bg-white rounded-full mx-auto my-1"></div>*/}

        <span
          className={`block p-0 w-4/5 mx-auto text-[16px] leading-[12px] pt-1 pb-0.5 text-center rounded-[3px] text-gray-400 ${
            isCurrentPlayer && '!text-white font-semibold'
          }`}
        >
          {player.amount}
        </span>

        {showTooltip && (
          <div className={`absolute flex justify-center  items-center animate-bounce top-[150%] left-0 right-0`}>
            <div className={`px-4 text-center  shadow-md text-white text-[16px] rounded  py-0.5 ${amountChange > 0 ? 'bg-green-500' : 'bg-red-500'}`}>
              {amountChange > 0 ? '+' : ''}
              {amountChange}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PlayersInfo = () => {
  const { gameInfo } = useGameContext();

  return (
    <div className="w-full h-full flex items-start justify-around">
      {gameInfo.players.map((player, index) => (
        <PlayerInfo key={player.id} player={player} index={index} isCurrentPlayer={gameInfo.currentPlayer === index} />
      ))}
    </div>
  );
};

export default PlayersInfo;
