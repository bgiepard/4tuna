import React from 'react';
import { useGameContext } from '../gameContext';

const PlayersInfo = () => {
  const { gameInfo } = useGameContext();

  return (
    <div className="mx-2 mb-3 grid grid-cols-2">
      {gameInfo.players.map((player, index) => (
        <div
          className={`flex flex-col text-sm px-2 ${gameInfo.currentPlayer === index && 'bg-green-400'}`}
          key={player.name}
        >
          <span className=""> {player.amount}</span>
          <span className="font-bold">{player.name}</span>
          <span className="">Total: {player.total}</span>
        </div>
      ))}
    </div>
  );
};

export default PlayersInfo;
