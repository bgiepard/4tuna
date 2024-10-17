import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext(undefined);

export const GameContextProvider = ({ children }) => {
  const [phrases, setPhrases] = useState([
    'Gdzie drwa rąbią tam wióry lecą',
    'Z małej chmury duży deszcz',
    'Co nagle to po diable',
    'Lepszy wróbel w garści',
    'Kto pyta nie błądzi',
    'Gdzie kucharek sześć tam nie ma co jeść',
    'Czas leczy rany',
    'Bez pracy nie ma kołaczy',
    'Strzeżonego Pan Bóg strzeże',
    'Prawda w oczy kole',
  ]);

  const getRandomPhrase = () => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
  };

  const [gameInfo, setGameInfo] = useState({
    stake: 0,
    players: [
      { name: 'Player 1', amount: 0, total: 0 },
      { name: 'Player 2', amount: 0, total: 0 },
      { name: 'Player 3', amount: 0, total: 0 },
      { name: 'Player 4', amount: 0, total: 0 },
    ],
    round: 1,
    currentPlayer: 0,
    badLetters: [],
    goodLetters: [],
    phrase: getRandomPhrase(),
    category: 'Przysłowia',
    currentLetter: '',
    rotate: 0,
    guess: false,

    goodGuess: true,
    afterRotate: false,
    onlyVowels: false,
  });

  const lowels = ['A', 'E', 'U', 'I', 'O', 'U', 'Y', 'Ą', 'Ę', 'Ó'];

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
      afterRotate: false,
      currentPlayer:
        (prevGameInfo.currentPlayer + 1) % prevGameInfo.players.length,
    }));
  };

  const resetPoints = () => {
    setGameInfo((prevGameInfo) => {
      const updatedPlayers = prevGameInfo.players.map((player) => ({
        ...player,
        amount: 0,
      }));

      return {
        ...prevGameInfo,
        players: updatedPlayers,
        afterRotate: false,
        currentPlayer:
          (prevGameInfo.currentPlayer + 1) % prevGameInfo.players.length,
      };
    });
  };

  const rotateWheel = () => {
    setGameInfo((prevGameInfo) => ({
      ...prevGameInfo,
      afterRotate: true,
      rotate: Math.floor(Math.random() * (721 - 180)) + 180,
    }));
  };

  const letMeGuess = () => {
    setGameInfo((prevGameInfo) => ({
      ...prevGameInfo,
      guess: !prevGameInfo.guess,
    }));
  };

  const letterClick = (letter) => {
    const upperLetter = letter.toUpperCase();
    const upperPhrase = gameInfo.phrase.toUpperCase();

    setGameInfo((prevGameInfo) => {
      const letterInPhrase = upperPhrase.includes(upperLetter);

      if (prevGameInfo.guess) {
        // Guessing mode
        if (letterInPhrase) {
          // Add the letter to goodLetters
          const newGoodLetters = [
            ...new Set([...prevGameInfo.goodLetters, upperLetter]),
          ];

          // Check if all letters have been guessed
          const allLettersInPhrase = new Set(
            upperPhrase.replace(/\s/g, '').split('')
          );
          const guessedAllLetters = [...allLettersInPhrase].every((char) =>
            newGoodLetters.includes(char)
          );

          if (guessedAllLetters) {
            // Update all players
            const currentPlayerIndex = prevGameInfo.currentPlayer;
            const updatedPlayers = prevGameInfo.players.map((player, index) => {
              if (index === currentPlayerIndex) {
                // Winning player: add amount to total and reset amount
                return {
                  ...player,
                  total: player.total + player.amount,
                  amount: 0,
                };
              } else {
                // Other players: reset amount
                return {
                  ...player,
                  amount: 0,
                };
              }
            });

            // Reset game state for a new round
            return {
              ...prevGameInfo,
              players: updatedPlayers,
              goodLetters: [],
              badLetters: [],
              currentLetter: '',
              category: getRandomPhrase(), // Replace with a new category
              guess: false,
              // Optionally, increment the round number
              round: prevGameInfo.round + 1,
              onlyVowels: false,
              afterRotate: false,
              currentPlayer: currentPlayerIndex + 1,
            };
          }

          return {
            ...prevGameInfo,
            goodLetters: newGoodLetters,
          };
        } else {
          // Incorrect guess; pass turn to next player and exit guessing mode
          const currentPlayerIndex = prevGameInfo.currentPlayer;
          const updatedPlayers = prevGameInfo.players.map((player, index) => {
            if (index === currentPlayerIndex) {
              // Current player: reset amount
              return {
                ...player,
                amount: 0,
              };
            } else {
              // Other players: keep as is
              return player;
            }
          });

          return {
            ...prevGameInfo,
            players: updatedPlayers,
            currentPlayer:
              (prevGameInfo.currentPlayer + 1) % prevGameInfo.players.length,
            guess: false,
          };
        }
      } else {
        // Normal mode
        const letterCount = upperPhrase
          .split('')
          .filter((char) => char === upperLetter).length;

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

        const allLettersInPhrase = new Set(
          upperPhrase.replace(/\s/g, '').split('')
        );
        const unguessedLetters = [...allLettersInPhrase].filter(
          (char) => !newGoodLetters.includes(char)
        );

        // Define the set of vowels (using your 'lowels' array)
        const vowels = lowels.map((vowel) => vowel.toUpperCase());

        const onlyVowelsLeft = unguessedLetters.every((char) =>
          vowels.includes(char)
        );

        // If only vowels are left, update 'afterRotate' and 'goodGuess'
        if (onlyVowelsLeft) {
          return {
            ...prevGameInfo,
            currentLetter: upperLetter,
            goodLetters: newGoodLetters,
            badLetters: newBadLetters,
            goodGuess: true,
            afterRotate: true,
            currentPlayer: prevGameInfo.currentPlayer,
            onlyVowels: true,
          };
        }

        return {
          ...prevGameInfo,
          currentLetter: upperLetter,
          goodLetters: newGoodLetters,
          badLetters: newBadLetters,
          currentPlayer: isCorrectLetter
            ? prevGameInfo.currentPlayer
            : (prevGameInfo.currentPlayer + 1) % prevGameInfo.players.length,
          goodGuess: isCorrectLetter,
          afterRotate: false,
          onlyVowels: false,
        };
      }
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
        letMeGuess,
        lowels,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use the game context
export const useGameContext = () => {
  return useContext(GameContext);
};
