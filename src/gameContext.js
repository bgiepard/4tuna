import React, { createContext, useContext, useState, useEffect } from 'react';
import socket from './socket';

const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [gameInfo, setGameInfo] = useState({
    gameID: null,
    stake: 0,
    players: [
      {
        name: 'Bartek',
        amount: 1200,
        total: 400,
      },
      {
        name: 'Tom',
        amount: 1200,
        total: 400,
      },
      {
        name: 'Marta',
        amount: 1200,
        total: 400,
      },
      {
        name: 'Bob',
        amount: 1200,
        total: 400,
      },
    ],
    round: 1,
    maxRounds: 3,
    currentPlayer: 0,
    phrase: 'Kto pod kim dołki kopie ten sam idzie ',
    category: 'Przysłowia',
    currentLetter: '',
    rotate: 0,
    mode: 'rotating',
    rotating: false,
    goodGuess: true,
    onlyVowels: false,
    vowels: ['A', 'E', 'I', 'O', 'U', 'Y', 'Ą', 'Ę', 'Ó'],
    badLetters: [],
    goodLetters: [],
  });

  useEffect(() => {
    if (gameInfo.gameID) {
      const gameID = gameInfo.gameID;
      socket.emit('getGameData', gameID, (response) => {
        if (!response.success) {
          console.error(response.message);
        } else {
          setGameInfo({
            ...gameInfo,
            ...response.gameData.gameInfo,
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
    socket.emit(
      'newGameEvent',
      { gameID, name: 'rotate', payload: {} },
      (response) => {
        if (!response.success) {
          console.error(response.message);
        } else {
          console.log('Rotate event processed', response.gameData);
        }
      }
    );
  };

  const letterClick = (gameID, letter) => {
    socket.emit(
      'newGameEvent',
      { gameID, name: 'letterClick', payload: { letter } },
      (response) => {
        if (!response.success) {
          console.error(response.message);
        } else {
          console.log('LetterClick event processed', response.gameData);
        }
      }
    );
  };

  const addPoints = (gameID, letterCount) => {
    socket.emit(
      'newGameEvent',
      { gameID, name: 'addPoints', payload: { letterCount } },
      (response) => {
        if (!response.success) {
          console.error(response.message);
        }
      }
    );
  };

  const nextPlayer = () => {
    const gameID = gameInfo.gameID;

    socket.emit(
      'newGameEvent',
      { gameID, name: 'nextPlayer', payload: {} },
      (response) => {
        if (!response.success) {
          console.error(response.message);
        }
      }
    );
  };

  const resetPoints = (gameID) => {
    socket.emit(
      'newGameEvent',
      { gameID, name: 'resetPoints', payload: {} },
      (response) => {
        if (!response.success) {
          console.error(response.message);
        }
      }
    );
  };

  const resetHalf = (gameID) => {
    socket.emit(
      'newGameEvent',
      { gameID, name: 'resetHalf', payload: {} },
      (response) => {
        if (!response.success) {
          console.error(response.message);
        }
      }
    );
  };

  const letMeGuess = () => {
    const gameID = gameInfo.gameID;
    socket.emit(
      'newGameEvent',
      { gameID, name: 'letMeGuess', payload: {} },
      (response) => {
        if (!response.success) {
          console.error(response.message);
        }
      }
    );
  };

  const resetStake = (gameID) => {
    socket.emit(
      'newGameEvent',
      { gameID, name: 'resetStake', payload: {} },
      (response) => {
        if (!response.success) {
          console.error(response.message);
        }
      }
    );
  };

  const setGameID = (gameID) => {
    setGameInfo({ ...gameInfo, gameID: gameID });
  };

  const processValue = () => {
    const gameID = gameInfo.gameID;
    socket.emit(
      'newGameEvent',
      { gameID, name: 'processValue', payload: {} },
      (response) => {
        if (!response.success) {
          console.error(response.message);
        } else {
          console.log('ProcessValue event processed', response.gameData);
        }
      }
    );
  };

  return (
    <GameContext.Provider
      value={{
        gameInfo,
        setGameID,
        rotateWheel,
        letterClick,
        addPoints,
        nextPlayer,
        resetPoints,
        resetHalf,
        letMeGuess,
        resetStake,
        processValue,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
