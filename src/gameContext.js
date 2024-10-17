import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext(undefined);

export const GameContextProvider = ({ children }) => {
  const [gameInfo, setGameInfo] = useState({
    stake: 0,
    players: [
      {
        name: 'Player 1',
        amount: 0,
        total: 100,
      },
      {
        name: 'Player 2',
        amount: 0,
        total: 200,
      },
      {
        name: 'Player 3',
        amount: 0,
        total: 300,
      },
      {
        name: 'Player 4',
        amount: 0,
        total: 400,
      },
    ],
    round: 1,
    currentPlayer: 0,
    badLetters: [],
    goodLetters: [],
    phrase: 'Kto pod kim dołki kopie',
    category: 'Powiedzenia',
    currentLetter: '',
    rotate: 0,
    guess: false,
  });

  const addPoints = (letterCount) => {
    const updatedPlayers = [...gameInfo.players];

    updatedPlayers[gameInfo.currentPlayer] = {
      ...updatedPlayers[gameInfo.currentPlayer],
      amount:
        updatedPlayers[gameInfo.currentPlayer].amount +
        gameInfo.stake * letterCount,
    };

    return updatedPlayers;
  };

  const nextPlayer = () => {
    setGameInfo({
      ...gameInfo,
      currentPlayer: (gameInfo.currentPlayer + 1) % gameInfo.players.length,
    });
  };

  const resetPoints = () => {
    const updatedPlayers = [...gameInfo.players];

    updatedPlayers[gameInfo.currentPlayer] = {
      ...updatedPlayers[gameInfo.currentPlayer],
      amount: 0,
    };

    setGameInfo({
      ...gameInfo,
      players: updatedPlayers,
      currentPlayer: (gameInfo.currentPlayer + 1) % gameInfo.players.length,
    });
  };

  // const nextRound = () => {};

  // const startGame = () => {};

  // const finishGame = () => {};

  const rotateWheel = () => {
    setGameInfo({
      ...gameInfo,
      rotate: Math.floor(Math.random() * (721 - 180)) + 180,
    });
  };

  const letMeQuest = () => {
    setGameInfo({
      ...gameInfo,
      guess: true,
    });
  };

  const letterClick = (letter) => {
    const upperLetter = letter.toUpperCase();
    const upperPhrase = gameInfo.phrase.toUpperCase();

    // Count occurrences of the selected letter in the phrase
    const letterCount = upperPhrase
      .split('')
      .filter((char) => char === upperLetter).length;

    if (letterCount > 0) {
      setGameInfo((prevGameInfo) => ({
        ...prevGameInfo,
        currentLetter: upperLetter,
        goodLetters: prevGameInfo.goodLetters.includes(upperLetter)
          ? prevGameInfo.goodLetters
          : [...prevGameInfo.goodLetters, upperLetter],
        players: addPoints(letterCount), // Pass the letter count to addPoints
      }));
    } else {
      setGameInfo((prevGameInfo) => ({
        ...prevGameInfo,
        currentLetter: upperLetter,
        badLetters: prevGameInfo.badLetters.includes(upperLetter)
          ? prevGameInfo.badLetters
          : [...prevGameInfo.badLetters, upperLetter],
        currentPlayer: (gameInfo.currentPlayer + 1) % gameInfo.players.length, // Loop back to first player if last player
      }));
    }
  };

  return (
    <GameContext.Provider
      value={{
        gameInfo,
        setGameInfo,
        letterClick,
        resetPoints,
        nextPlayer,
        rotateWheel,
        letMeQuest,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(GameContext);
};
