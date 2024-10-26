import React, { useRef, useEffect, useState } from 'react';
import { useGameContext } from '../gameContext';
import socket from '../socket';

const Buttons = () => {
  const { gameInfo, rotateWheel, letMeGuess, nextPlayer } = useGameContext();
  const spinSound = useRef(null);

  const currentPlayer = gameInfo.players[gameInfo.currentPlayer]?.id;
  const isMyTurn = currentPlayer && currentPlayer === socket.id;

  const [remainingTime, setRemainingTime] = useState(15000); // 15 seconds in milliseconds
  const timerRef = useRef(null);
  const isPausedRef = useRef(false);
  const modeRef = useRef(gameInfo.mode);

  // New state variable to control the disabled state of the rotate button
  const [rotateButtonDisabled, setRotateButtonDisabled] = useState(false);

  // Keep track of the current game mode and re-enable the rotate button when appropriate
  useEffect(() => {
    modeRef.current = gameInfo.mode;

    // Re-enable the rotate button when mode is 'rotating'
    if (gameInfo.mode === 'rotating') {
      setRotateButtonDisabled(false);
    }
  }, [gameInfo.mode]);

  // Function to start the timer
  const startTimer = () => {
    if (timerRef.current) return; // Timer already running
    isPausedRef.current = false;

    timerRef.current = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 100) {
          clearInterval(timerRef.current);
          timerRef.current = null;

          if (modeRef.current === 'guessing') {
            nextPlayer();
          }

          nextPlayer();
          return 0;
        }
        return prevTime - 100;
      });
    }, 100);
  };

  // Function to stop the timer
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Function to pause the timer
  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      isPausedRef.current = true;
    }
  };

  // Function to resume the timer
  const resumeTimer = () => {
    if (!timerRef.current && isPausedRef.current) {
      isPausedRef.current = false;
      startTimer();
    }
  };

  // Effect to handle timer based on turn and game mode
  useEffect(() => {
    if (isMyTurn) {
      if (gameInfo.mode === 'guessing') {
        // Reset timer to 15 seconds when entering guessing mode
        stopTimer();
        setRemainingTime(15000);
        startTimer();
      } else {
        // Start or resume the timer if not already running or paused
        if (!timerRef.current && !isPausedRef.current) {
          startTimer();
        }
      }
    } else {
      // Not my turn, stop the timer and reset remaining time
      stopTimer();
      setRemainingTime(15000);
    }

    // Cleanup when component unmounts or dependencies change
    return () => {
      stopTimer();
    };
  }, [isMyTurn, gameInfo.mode]);

  // Handle Rotate Wheel action
  const handleRotateWheel = () => {
    if (spinSound.current) {
      spinSound.current.play();
    }
    pauseTimer(); // Pause the timer during rotation
    rotateWheel();

    setRotateButtonDisabled(true); // Disable the rotate button

    // After 2 seconds (duration of rotation), resume the timer
    setTimeout(() => {
      resumeTimer();
    }, 2000); // Adjust duration as needed
  };

  // Handle Let Me Guess action
  const handleLetMeGuess = () => {
    stopTimer();
    setRemainingTime(15000);
    startTimer();
    letMeGuess();
  };

  // Handle Next Player action
  const handleNextPlayer = () => {
    stopTimer();
    nextPlayer();
  };

  if (!isMyTurn) {
    return (
      <div className="text-center text-sm min-h-[58px] flex flex-col items-center justify-center">
        {gameInfo.mode === 'guessing' ? (
          <span className="text-blue-400">
            {gameInfo.players[gameInfo.currentPlayer].name} próbuje odgadnąć
            hasło
          </span>
        ) : (
          <span className="text-orange-400">
            Poczekaj na swoją kolej, aktualny gracz:{' '}
            {gameInfo.players[gameInfo.currentPlayer].name}
          </span>
        )}
        <div className="bg-transparent h-[10px] w-full"></div>
      </div>
    );
  }

  return (
    <div>
      <audio ref={spinSound}>
        <source src="/assets/spin.mp3" type="audio/mpeg" />
        <source src="/assets/spin.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

      <div className="flex items-center gap-2 relative z-10 h-[48px]">
        <button
          onClick={handleNextPlayer}
          disabled={gameInfo.mode === 'rotating'}
          className={`p-1 bg-blue-300 rounded mx-auto disabled:opacity-10`}
        >
          Odpuść
        </button>

        <button
          onClick={handleRotateWheel}
          disabled={
            rotateButtonDisabled ||
            gameInfo.mode !== 'rotating' ||
            gameInfo.onlyVowels
          }
          className={`shadow shadow-black p-1 px-6 bg-blue-300 rounded mx-auto disabled:opacity-10 ${
            gameInfo.mode === 'rotating' &&
            'bg-gradient-to-b from-orange-500 text-white to-orange-300 py-1.5'
          }`}
        >
          Zakręć
        </button>

        <button
          onClick={handleLetMeGuess}
          className={`p-1 bg-blue-300 rounded mx-auto disabled:opacity-10`}
          disabled={
            gameInfo.goodLetters.length < 2 || gameInfo.mode === 'guessing'
          }
        >
          Rozwiąż
        </button>
      </div>

      {/* Countdown Bar */}
      <div className="bg-gray-800 h-[10px] w-full">
        <div
          className="bg-red-500 h-full"
          style={{
            width: `${(remainingTime / 15000) * 100}%`,
            transition: 'width 0.1s linear',
          }}
        ></div>
      </div>
    </div>
  );
};

export default Buttons;
