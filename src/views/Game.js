import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { useGameContext } from '../gameContext';
import Phrase from '../components/Phrase';
import PieChart from '../components/PieChart';
import Buttons from '../components/Buttons';
import PlayersInfo from '../components/PlayersInfo';
import Keyboard from '../components/Keyboard';

const Game = () => {
  const { gameID } = useParams();

  const { gameInfo, setGameID } = useGameContext();
  const [roundChange, setRoundChange] = useState(false);

  const gameContainerRef = useRef(null); // Ref to the container you want to fullscreen

  const prevRoundRef = useRef();

  useEffect(() => {
    console.log('use effect from Game', gameID);
    if (gameID) {
      setGameID(gameID);
    }
  }, [gameID]);

  useEffect(() => {
    const prevRound = prevRoundRef.current;
    if (prevRound !== undefined && gameInfo && gameInfo.round !== prevRound) {
      setRoundChange(true);
      setTimeout(
        () => setRoundChange(gameInfo.round > gameInfo.maxRounds),
        3000
      );
    }
    if (gameInfo) {
      prevRoundRef.current = gameInfo.round;
    }
  }, [gameInfo]);

  return (
    <div ref={gameContainerRef} className="h-full flex flex-col">
      {roundChange ? (
        <div className="h-full ">
          {gameInfo && gameInfo.round > gameInfo.maxRounds ? (
            <div className="p-4">
              <h1 className="text-center text-white">KONIEC GRY</h1>
              <ul className="flex flex-col mx-5">
                {gameInfo.players
                  .sort((a, b) => b.total - a.total)
                  .map((player) => (
                    <div key={player.name}>
                      <span>{player.name}</span> - <span>{player.total}</span>
                    </div>
                  ))}
              </ul>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center">
              <h1 className="text-white">Zmiana rundy</h1>
            </div>
          )}
        </div>
      ) : (
        <div className="h-full flex flex-col justify-between">
          <div className="div">
            <Phrase />

            <div className="flex flex-col items-center justify-center flex-grow ">
              <PieChart />
            </div>
          </div>

          <div className="">
            <Buttons />
            <div className="bg-black bg-opacity-25 pt-1 pb-2 mb-2 mt-4">
              <PlayersInfo />
            </div>
            <div className="mb-2">
              <Keyboard />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
