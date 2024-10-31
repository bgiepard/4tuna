import React, { createContext, useContext, useState, useEffect } from 'react';
import socket from './socket';

const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [gameInfo, setGameInfo] = useState({ gameID: null });

  useEffect(() => {
    if (gameInfo.gameID) {
      const gameID = gameInfo.gameID;
      socket.emit('getGameData', gameID, (response) => {
        if (!response.success) {
          console.error(response.message);
        } else {
          setGameInfo({
            ...response.gameData,
          });
        }
      });
    }

    socket.on('gameUpdate', (updatedGameInfo) => {
      setGameInfo({ ...gameInfo, ...updatedGameInfo });
    });

    return () => {
      socket.off('gameUpdate');
      socket.off('startGame');
      socket.off('getGameData');
    };
  }, [gameInfo.gameID]);

  const rotateWheel = () => {
    const gameID = gameInfo.gameID;
    socket.emit('newGameEvent', { gameID, name: 'rotate', payload: {} }, (response) => {
      if (!response.success) {
        console.error(response.message);
      } else {
        console.log('Rotate event processed', response.gameData);
      }
    });
  };

  const letterClick = (gameID, letter) => {
    socket.emit('newGameEvent', { gameID, name: 'letterClick', payload: { letter } }, (response) => {
      if (!response.success) {
        console.error(response.message);
      } else {
        // console.log('LetterClick event processed', response.gameData);
      }
    });
  };

  const nextPlayer = () => {
    const gameID = gameInfo.gameID;

    socket.emit('newGameEvent', { gameID, name: 'nextPlayer', payload: {} }, (response) => {
      if (!response.success) {
        console.error(response.message);
      }
    });
  };

  const letMeGuess = () => {
    const gameID = gameInfo.gameID;
    socket.emit('newGameEvent', { gameID, name: 'letMeGuess', payload: {} }, (response) => {
      if (!response.success) {
        console.error(response.message);
      }
    });
  };

  const setGameID = (gameID) => {
    setGameInfo({ ...gameInfo, gameID: gameID });
  };

  return (
    <GameContext.Provider
      value={{
        gameInfo,
        rotateWheel,
        letterClick,
        nextPlayer,
        letMeGuess,
        setGameID,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
