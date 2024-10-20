import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import screenfull from 'screenfull';

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
        const newGameData = response.game.gameOptions;
        setGameInfo({
          ...gameInfo,
          players: newGameData.players,
          phrase: newGameData.phrase,
          mode: newGameData.mode,
        });
      }
    });

    socket.on('gameUpdate', (game) => {
      console.log('game update', game);
      // Update gameInfo as needed
      setGameInfo(game);
    });

    return () => {
      socket.off('startGame');
      socket.off('gameUpdate');
    };
  }, [gameID, setGameInfo, gameInfo]);

  const handleNewGameEvent = () => {
    const name = 'xxx';
    socket.emit('newGameEvent', { gameID, name }, (response) => {
      if (!response.success) {
        console.error(response.message);
      } else {
        console.log('newGameEvent', response);
      }
    });
  };

  // Handler to toggle fullscreen
  const handleFullscreenToggle = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle(gameContainerRef.current);
      setIsFullscreen(!isFullscreen);
    } else {
      console.error('Fullscreen not supported');
    }
  };

  // Optional: Listen to fullscreen change events
  useEffect(() => {
    if (screenfull.isEnabled) {
      const onFullscreenChange = () => {
        setIsFullscreen(screenfull.isFullscreen);
      };
      screenfull.on('change', onFullscreenChange);

      return () => {
        screenfull.off('change', onFullscreenChange);
      };
    }
  }, []);

  return (
      <div
          ref={gameContainerRef} // Attach ref to the container
          className="h-full bg-gradient-to-b from-blue-500 to-blue-800 py-1 mx-auto flex flex-col max-w-[800px]"
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
                                <span>{player.name}</span> -{' '}
                                <span>{player.total}</span>
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
            </>
        )}

        {/* Replace the TEST button with Fullscreen toggle */}
        {/*<button*/}
        {/*    className="border p-2 mx-2 mt-2 bg-white text-blue-800 rounded"*/}
        {/*    onClick={handleFullscreenToggle}*/}
        {/*>*/}
        {/*  {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}*/}
        {/*</button>*/}
      </div>
  );
};

export default Game;
