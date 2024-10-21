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
  const [isFullscreen, setIsFullscreen] = useState(false); // State to track fullscreen status

  const gameContainerRef = useRef(null); // Ref to the container you want to fullscreen

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
        const { players, phrase, mode } = response.gameData.gameInfo;
        setGameInfo({
          ...gameInfo,
          gameID: gameID,
          players: players,
          phrase: phrase,
          mode: mode,
        });
      }
    });

    socket.on('gameUpdate', (game) => {
      setGameInfo({
        ...game,
        gameID: gameID,
      });
    });

    return () => {
      socket.off('startGame');
      socket.off('gameUpdate');
    };
  }, [gameID]);

  const handleRotate = () => {
    const name = 'rotate';
    socket.emit('newGameEvent', { gameID, name }, (response) => {
      if (!response.success) {
        console.error(response.message);
      } else {
        console.log('Rotate event processed', response.gameData);
      }
    });
  };

  const handleLetterClick = () => {
    const name = 'letterClick';
    const payload = {
      letter: 'Z',
    };
    socket.emit('newGameEvent', { gameID, name, payload }, (response) => {
      if (!response.success) {
        console.error(response.message);
      } else {
        console.log('Rotate event processed', response.gameData);
      }
    });
  };

  return (
    <div
      ref={gameContainerRef} // Attach ref to the container
      className="h-full bg-gradient-to-b from-blue-500 to-blue-800 py-1 mx-auto flex flex-col max-w-[500px]"
    >
      {roundChange ? (
        <div className="h-full ">
          {gameInfo.round > gameInfo.maxRounds ? (
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
        <>
          <Phrase />
          <div className="flex flex-col items-center justify-center flex-grow ">
            <PieChart />
            <div className="-mt-6 z-10">
              <Buttons />
            </div>
          </div>
          <PlayersInfo />
          <Keyboard />
          <div className="flex">
            <button onClick={handleRotate}>new game event</button>
            <button onClick={handleLetterClick}>handleLetterClick Z</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
