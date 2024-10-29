import React, { useRef, useEffect, useState } from 'react';
import { useGameContext } from '../gameContext';
import socket from '../socket';

const Buttons = () => {
  const { gameInfo, rotateWheel, letMeGuess, nextPlayer } = useGameContext();
  const spinSound = useRef(null);

  const currentPlayer = gameInfo.players[gameInfo.currentPlayer]?.id;
  const isMyTurn = currentPlayer && currentPlayer === socket.id;

  // const [remainingTime, setRemainingTime] = useState(15000); // 15 seconds in milliseconds
  // const timerRef = useRef(null);
  // const isPausedRef = useRef(false);
  const modeRef = useRef(gameInfo.mode);

  const [rotateButtonDisabled, setRotateButtonDisabled] = useState(false);

  useEffect(() => {
    modeRef.current = gameInfo.mode;

    if (gameInfo.mode === 'rotating') {
      setRotateButtonDisabled(false);
    }
  }, [gameInfo.mode]);

  const handleRotateWheel = () => {
    if (spinSound.current) {
      spinSound.current.play();
    }
    rotateWheel();

    setRotateButtonDisabled(true);
  };

  const handleLetMeGuess = () => {
    letMeGuess();
  };

  const handleNextPlayer = () => {
    nextPlayer();
  };

  if (!isMyTurn) {
    return (
      <div className="text-center text-sm h-[58px] flex flex-col items-center justify-center">
        {gameInfo.mode === 'guessing' ? (
          <span className="text-blue-400">
            {gameInfo.players[gameInfo.currentPlayer].name} próbuje odgadnąć
            hasło
          </span>
        ) : (
          <span className="text-yellow-300">
            Poczekaj na swoją kolej, <br /> aktualny gracz: &nbsp;
            <span className="text-orange-400 ">
              {gameInfo.players[gameInfo.currentPlayer].name}
            </span>
          </span>
        )}
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

      <div className="flex items-center gap-2 relative z-10 h-[58px]">
        <button
          onClick={handleNextPlayer}
          disabled={gameInfo.mode === 'rotating'}
          className={`shadow-xl p-1 px-4 bg-gradient-to-b from-[#95388C] to-[#C64CB9] rounded-[10px] mx-auto disabled:opacity-10 text-white text-[14px] leading-[20px]`}
        >
          Odpuść
        </button>

        <button
          onClick={handleRotateWheel}
          disabled={
            // rotateButtonDisabled ||
            gameInfo.mode !== 'rotating' || gameInfo.onlyVowels
          }
          className={` p-1 px-10 bg-blue-300 rounded-[6px] mx-auto disabled:opacity-10 ${
            gameInfo.mode === 'rotating' &&
            'bg-gradient-to-b from-[#FF7933] to-[#FF58E0] text-white py-1.5 shadow-xl shadow-blue-800'
          }`}
        >
          Zakręć
        </button>

        <button
          onClick={handleLetMeGuess}
          className={`shadow-xl p-1 px-4 bg-gradient-to-b from-[#467C1D] to-[#65B12C] rounded-[10px] mx-auto disabled:opacity-10 text-white text-[14px] leading-[20px]`}
          disabled={
            gameInfo.goodLetters.length < 2 || gameInfo.mode === 'guessing'
          }
        >
          Rozwiąż
        </button>
      </div>
    </div>
  );
};

export default Buttons;
