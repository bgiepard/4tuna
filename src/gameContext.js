import React, { createContext, useContext, useState, useCallback } from 'react';

const GameContext = createContext();

const initialPhrases = [
  'Z małej chmury duży deszcz',
  'Co nagle to po diable',
  'Lepszy wróbel w garści',
  'Kto pyta nie błądzi',
  'Czas leczy rany',
  'Bez pracy nie ma kołaczy',
  'Prawda w oczy kole',
  'Kto pod kim dołki kopie',
];

const vowels = ['A', 'E', 'I', 'O', 'U', 'Y', 'Ą', 'Ę', 'Ó'];

const values = [
  '-100%',
  1000,
  400,
  300,
  150,
  600,
  700,
  800,
  'STOP',
  600,
  200,
  100,
  250,
  500,
  800,
  1500,
];

export const GameContextProvider = ({ children }) => {
  const [phrases, setPhrases] = useState(initialPhrases);

  const getRandomPhrase = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
  }, [phrases]);

  const [gameInfo, setGameInfo] = useState({
    stake: 0,
    players: [
      { name: 'Bartek', amount: 0, total: 0 },
      { name: 'Oliwia', amount: 0, total: 0 },
      { name: 'Gosia', amount: 0, total: 0 },
      { name: 'Sebastian', amount: 0, total: 0 },
    ],
    round: 1,
    maxRounds: 3,
    currentPlayer: 0,
    badLetters: [],
    goodLetters: [],
    phrase: getRandomPhrase(),
    category: 'Przysłowia',
    currentLetter: '',
    rotate: 0,
    mode: 'rotating', // guessing, rotating, onlyVowels, letter
    rotating: false,
    goodGuess: true,
    onlyVowels: false,
  });

  const addPoints = useCallback((letterCount) => {
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
  }, []);

  const nextPlayer = useCallback(() => {
    setGameInfo((prevGameInfo) => ({
      ...prevGameInfo,
      mode: 'rotating',
      currentPlayer:
        (prevGameInfo.currentPlayer + 1) % prevGameInfo.players.length,
    }));
  }, []);

  const resetPoints = useCallback(() => {
    setGameInfo((prevGameInfo) => {
      const updatedPlayers = prevGameInfo.players.map((player, index) => {
        if (index === prevGameInfo.currentPlayer) {
          return { ...player, amount: 0 };
        }
        return player;
      });

      return {
        ...prevGameInfo,
        players: updatedPlayers,
        currentPlayer:
          (prevGameInfo.currentPlayer + 1) % prevGameInfo.players.length,
      };
    });
  }, []);

  const resetHalf = useCallback(() => {
    setGameInfo((prevGameInfo) => {
      const updatedPlayers = prevGameInfo.players.map((player, index) => {
        if (index === prevGameInfo.currentPlayer) {
          return {
            ...player,
            amount: player.amount > 0 ? player.amount / 2 : 0,
          };
        }
        return player;
      });

      return {
        ...prevGameInfo,
        players: updatedPlayers,
        currentPlayer:
          (prevGameInfo.currentPlayer + 1) % prevGameInfo.players.length,
      };
    });
  }, []);

  const rotateWheel = useCallback(() => {
    setGameInfo((prevGameInfo) => ({
      ...prevGameInfo,
      rotate: Math.floor(Math.random() * (721 - 360)) + 180,
    }));
  }, []);

  const letMeGuess = useCallback(() => {
    setGameInfo((prevGameInfo) => ({
      ...prevGameInfo,
      mode: 'guessing',
    }));
  }, []);

  const resetStake = useCallback(() => {
    setGameInfo((prevGameInfo) => ({
      ...prevGameInfo,
      stake: 0,
    }));
  }, []);

  const processSelectedValue = useCallback(
      (selectedValue) => {
        if (selectedValue === '-100%') {
          resetPoints();
        } else if (selectedValue === '-50%') {
          resetHalf();
        } else if (selectedValue === 'STOP') {
          nextPlayer();
        } else {
          setGameInfo((prevGameInfo) => ({
            ...prevGameInfo,
            stake: selectedValue,
            mode: 'letter',
            goodGuess: false,
            afterRotate: true, // TODO: remove if not needed
          }));
        }
      },
      [resetPoints, resetHalf, nextPlayer]
  );

  const determineSelectedValue = useCallback(
      (rotationAngle) => {
        let adjustedAngle = ((rotationAngle % 360) + 360) % 360;
        const sliceAngle = 360 / values.length;
        const arrowAngle = 0;
        let angleAtArrow = (adjustedAngle + arrowAngle) % 360;
        const sliceIndex = Math.floor(angleAtArrow / sliceAngle) % values.length;
        return values[sliceIndex];
      },
      [values]
  );

  const handleRotate = useCallback(
      (
          deg = 0,
          rotationAngle,
          setRotationAngle,
          isAnimating,
          setIsAnimating,
          setTransitionDuration
      ) => {
        if (isAnimating) return;
        const randomDeg = Math.floor(deg);
        const newRotationAngle = rotationAngle + randomDeg;
        const totalDegrees = newRotationAngle - rotationAngle;
        const rotations = totalDegrees / 360;
        const newTransitionDuration = rotations * 1000;

        setTransitionDuration(newTransitionDuration);
        setRotationAngle(newRotationAngle);
        setIsAnimating(true);
        resetStake();
      },
      [resetStake]
  );

  const letterClick = useCallback(
    (letter) => {
      const upperLetter = letter.toUpperCase();
      const upperPhrase = gameInfo.phrase.toUpperCase();

      setGameInfo((prevGameInfo) => {
        const letterInPhrase = upperPhrase.includes(upperLetter);

        if (prevGameInfo.mode === 'guessing') {
          if (letterInPhrase) {
            const newGoodLetters = [
              ...new Set([...prevGameInfo.goodLetters, upperLetter]),
            ];

            const allLettersInPhrase = new Set(
              upperPhrase.replace(/\s/g, '').split('')
            );
            const guessedAllLetters = [...allLettersInPhrase].every((char) =>
              newGoodLetters.includes(char)
            );

            if (guessedAllLetters) {
              const currentPlayerIndex = prevGameInfo.currentPlayer;
              const updatedPlayers = prevGameInfo.players.map(
                (player, index) => {
                  if (index === currentPlayerIndex) {
                    return {
                      ...player,
                      total: player.total + player.amount,
                      amount: 0,
                    };
                  } else {
                    return { ...player, amount: 0 };
                  }
                }
              );

              // Usuwanie wykorzystanego przysłowia
              const updatedPhrases = phrases.filter(
                (phrase) => phrase !== prevGameInfo.phrase
              );

              let availablePhrases = updatedPhrases;
              if (updatedPhrases.length === 0) {
                availablePhrases = initialPhrases.filter(
                  (phrase) => phrase !== prevGameInfo.phrase
                );
                setPhrases(initialPhrases);
              } else {
                setPhrases(updatedPhrases);
              }

              // Wybór nowego przysłowia
              const newPhrase =
                availablePhrases[
                  Math.floor(Math.random() * availablePhrases.length)
                ];

              return {
                ...prevGameInfo,
                players: updatedPlayers,
                goodLetters: [],
                badLetters: [],
                currentLetter: '',
                phrase: newPhrase,
                category: 'Przysłowia',
                round: prevGameInfo.round + 1,
                onlyVowels: false,
                currentPlayer:
                  (currentPlayerIndex + 1) % prevGameInfo.players.length,
                mode: 'rotating',
                rotate: 0,
              };
            }

            return {
              ...prevGameInfo,
              goodLetters: newGoodLetters,
            };
          } else {
            const currentPlayerIndex = prevGameInfo.currentPlayer;
            const updatedPlayers = prevGameInfo.players.map((player, index) => {
              if (index === currentPlayerIndex) {
                return { ...player, amount: 0 };
              }
              return player;
            });

            return {
              ...prevGameInfo,
              players: updatedPlayers,
              currentPlayer:
                (prevGameInfo.currentPlayer + 1) % prevGameInfo.players.length,
              mode: 'rotating',
            };
          }
        } else {
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

          const onlyVowelsLeft = unguessedLetters.every((char) =>
            vowels.includes(char)
          );

          if (onlyVowelsLeft) {
            return {
              ...prevGameInfo,
              currentLetter: upperLetter,
              goodLetters: newGoodLetters,
              badLetters: newBadLetters,
              goodGuess: isCorrectLetter,
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
            mode: 'rotating',
            onlyVowels: false,
          };
        }
      });
    },
    [addPoints, gameInfo.phrase, phrases]
  );

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
        resetHalf,
        vowels,
        resetStake,
        processSelectedValue,
        handleRotate,
        determineSelectedValue
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use the game context
export const useGameContext = () => useContext(GameContext);
