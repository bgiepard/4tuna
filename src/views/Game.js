import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { useGameContext } from '../gameContext';
import Phrase from '../components/Phrase';
import PieChart from '../components/PieChart';
import Buttons from '../components/Buttons';
import PlayersInfo from '../components/PlayersInfo';
import Keyboard from '../components/Keyboard';
import socket from '../socket';

const Game = () => {
  const { gameID } = useParams();

  const { gameInfo, setGameInfo } = useGameContext();
  const [roundChange, setRoundChange] = useState(false);

  const prevRoundRef = useRef();

  useEffect(() => {
    const prevRound = prevRoundRef.current;
    if (prevRound !== undefined && gameInfo.round !== prevRound) {
      setRoundChange(true);
      setTimeout(
        () => setRoundChange(gameInfo.round > gameInfo.maxRounds),
        3000
      );
    }
    prevRoundRef.current = gameInfo.round;
  }, [gameInfo.round]);

  useEffect(() => {
    socket.emit('getGameData', gameID, (response) => {
      if (!response.success) {
        console.error(response.message);
      } else {
        console.log('game data', response.game);
        setGameInfo({
          ...gameInfo,
          players: response.game.players,
          phrase: response.game.phrase,
        });
      }
    });

    return () => {
      socket.off('startGame');
    };
  }, [gameID]);

  return (
    <div className="h-full bg-gradient-to-b from-blue-500 to-blue-800 py-1 mx-auto flex flex-col max-w-[800px]">
      {roundChange ? (
        <div className="h-full ">
          {gameInfo.round > gameInfo.maxRounds ? (
            <div className="p-4">
              <h1 className="text-center text-white">KONIE GRY</h1>
              <ul className="flex flex-col mx-5">
                {gameInfo.players
                  .sort((a, b) => b.total - a.total)
                  .map((player) => {
                    return (
                      <div key={player.name}>
                        <span>{player.name}</span> - <span>{player.total}</span>
                      </div>
                    );
                  })}
              </ul>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center">
              <h1 className="text-white">Zmiana rundy</h1>
            </div>
          )}
        </div>
      ) : (
        <>
          <Phrase />
          <div className="flex flex-col items-center justify-center flex-grow ">
            <PieChart />
            <Buttons />
          </div>
          <PlayersInfo />
          <Keyboard />
        </>
      )}
    </div>
  );
};

export default Game;
