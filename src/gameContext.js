import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext(undefined);

export const GameContextProvider = ({ children }) => {
  const [gameInfo, setGameInfo] = useState({
    stake: 0,
    players: [
      { name: 'Player 1', amount: 0, total: 100 },
      { name: 'Player 2', amount: 0, total: 200 },
      { name: 'Player 3', amount: 0, total: 300 },
      { name: 'Player 4', amount: 0, total: 400 },
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
    setGameInfo((prevGameInfo) => {
      const updatedPlayers = [...prevGameInfo.players];
      const currentPlayer = updatedPlayers[prevGameInfo.currentPlayer];

      updatedPlayers[prevGameInfo.currentPlayer] = {
        ...currentPlayer,
        amount: currentPlayer.amount + prevGameInfo.stake * letterCount,
      };

      return {
        ...prevGameInfo,
        players: updatedPlayers,
      };
    });
  };

  const nextPlayer = () => {
    setGameInfo((prevGameInfo) => ({
      ...prevGameInfo,
      currentPlayer:
        (prevGameInfo.currentPlayer + 1) % prevGameInfo.players.length,
    }));
  };

  const resetPoints = () => {
    setGameInfo((prevGameInfo) => {
      const updatedPlayers = [...prevGameInfo.players];
      const currentPlayer = updatedPlayers[prevGameInfo.currentPlayer];

      updatedPlayers[prevGameInfo.currentPlayer] = {
        ...currentPlayer,
        amount: 0,
      };

      return {
        ...prevGameInfo,
        players: updatedPlayers,
        currentPlayer:
          (prevGameInfo.currentPlayer + 1) % prevGameInfo.players.length,
      };
    });
  };

  const rotateWheel = () => {
    setGameInfo((prevGameInfo) => ({
      ...prevGameInfo,
      rotate: Math.floor(Math.random() * (721 - 180)) + 180,
    }));
  };

  const letMeQuest = () => {
    setGameInfo((prevGameInfo) => ({
      ...prevGameInfo,
      guess: true,
    }));
  };

  const letterClick = (letter) => {
    const upperLetter = letter.toUpperCase();
    const upperPhrase = gameInfo.phrase.toUpperCase();

    // Zliczanie wystąpień litery w frazie
    const letterCount = upperPhrase
      .split('')
      .filter((char) => char === upperLetter).length;

    setGameInfo((prevGameInfo) => {
      const isCorrectLetter = letterCount > 0;
      const newGoodLetters = isCorrectLetter
        ? [...new Set([...prevGameInfo.goodLetters, upperLetter])]
        : prevGameInfo.goodLetters;
      const newBadLetters = !isCorrectLetter
        ? [...new Set([...prevGameInfo.badLetters, upperLetter])]
        : prevGameInfo.badLetters;

      if (isCorrectLetter) {
        addPoints(letterCount);
      }

      return {
        ...prevGameInfo,
        currentLetter: upperLetter,
        goodLetters: newGoodLetters,
        badLetters: newBadLetters,
        currentPlayer: isCorrectLetter
          ? prevGameInfo.currentPlayer
          : (prevGameInfo.currentPlayer + 1) % prevGameInfo.players.length,
      };
    });
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

// Customowy hook do korzystania z kontekstu gry
export const useGameContext = () => {
  return useContext(GameContext);
};
