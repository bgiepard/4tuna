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
      className={`flex items-center justify-between pt-2 pb-2 w-full pr-4 m-4 bg-[#6D42DA] opacity-70 rounded-[10px] ${
        isCurrentPlayer && '!opacity-100 bg-[#E4BC45] shadow-xl'
      }`}
    >
      <div className="w-[25px] h-[25px] bg-white rounded-full ml-2 mr-2"></div>
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

        <span
          className={`block p-0 w-4/5 mx-auto text-[16px] leading-[12px] pt-1 pb-0.5 text-center rounded-[3px] text-gray-400 ${
            isCurrentPlayer && '!text-white font-semibold'
          }`}
        >
          {player.amount}
        </span>

        {showTooltip && (
          <div
            className={`absolute flex justify-center animate-bounce items-center top-[150%] left-0 right-0 mx-auto px-4  text-center  shadow-md text-white text-[16px] rounded  py-0.5 ${amountChange > 0 ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {amountChange > 0 ? '+' : ''}
            {amountChange}
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
