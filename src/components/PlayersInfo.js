import React, { useState, useEffect, useRef } from 'react';
import { useGameContext } from '../gameContext';

const PlayerInfo = ({ player, index, isCurrentPlayer }) => {
  const [prevAmount, setPrevAmount] = useState(player.amount);
  const [amountChange, setAmountChange] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  const goodSound = useRef(null);
  const wrongSound = useRef(null);

  useEffect(() => {
    if (player.amount !== prevAmount) {
      const diff = player.amount - prevAmount;
      setAmountChange(diff);
      setShowTooltip(true);
      setPrevAmount(player.amount);

      if (diff > 0) {
        if (goodSound.current) {
          goodSound.current.play();
        }
      } else if (diff === 0) {
        console.log('neutral');
      } else {
        if (wrongSound.current) {
          wrongSound.current.play();
        }
      }

      // Hide the tooltip after 1 second
      const timeout = setTimeout(() => {
        setShowTooltip(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [player.amount]);

  return (
    <div
      className={`flex flex-col items-center justify-between pt-1 pb-1 w-full mx-1 bg-black bg-opacity-10 rounded-[10px] ${!player.connected && '!opacity-10 bg-red-500'} ${
        isCurrentPlayer && '!opacity-100 !bg-[#E4BC45] shadow-xl'
      } `}
    >
      <audio ref={goodSound}>
        <source src="/assets/good.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <audio ref={wrongSound}>
        <source src="/assets/wrong.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="flex flex-col grow relative">
        <div
          className={`mx-auto text-[12px] flex flex-col items-center justify-center text-center text-pink-300 overflow-hidden ${
            isCurrentPlayer && '!text-white font-semibold'
          }`}
        >
          <span className="block truncate">
            <span className="truncate">{player.name}</span>
          </span>
        </div>
        {/*<div className="w-[25px] h-[25px] bg-white rounded-full mx-auto my-1"></div>*/}

        <span
          className={`block p-0 w-4/5 mx-auto text-[16px] leading-[12px] pt-1 pb-0.5 text-center rounded-[3px] text-pink-200 ${
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
