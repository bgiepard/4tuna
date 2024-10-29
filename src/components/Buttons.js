import React, { useEffect, useRef, useState } from 'react';
import { useGameContext } from '../gameContext';
import socket from '../socket';

const Buttons = () => {
  const { gameInfo, rotateWheel, letMeGuess, nextPlayer } = useGameContext();
  const spinSound = useRef(null);

  const { players, currentPlayer, mode, onlyVowels, goodLetters } = gameInfo;
  const currentPlayerId = players[currentPlayer]?.id;
  const isMyTurn = currentPlayerId && currentPlayerId === socket.id;

  const [rotateClicked, setRotateClicked] = useState(false);

  useEffect(() => {
    setRotateClicked(false);
  }, [gameInfo.mode]);

  const handleRotateWheel = () => {
    // if (rotateClicked) return;
    setRotateClicked(true);

    if (spinSound.current) {
      spinSound.current.play();
    }
    rotateWheel();
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
        {mode === 'guessing' ? (
          <span className="text-blue-400">
            {players[currentPlayer].name} próbuje odgadnąć hasło
          </span>
        ) : (
          <span className="text-yellow-300">
            Poczekaj na swoją kolej, <br /> aktualny gracz:&nbsp;
            <span className="text-orange-400">
              {players[currentPlayer].name}
            </span>
          </span>
        )}
      </div>
    );
  }

  const isRotateButtonDisabled = mode !== 'rotating' || onlyVowels;

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
          disabled={mode === 'rotating'}
          className=" p-1 px-4 bg-[#C64CB9] rounded-[10px] mx-auto disabled:opacity-10 text-white text-[14px] leading-[20px] border-2 border-pink-400"
        >
          Odpuść
        </button>

        <button
          onClick={handleRotateWheel}
          disabled={isRotateButtonDisabled}
          className={`p-1 px-10 rounded-[6px] mx-auto disabled:opacity-10 ${
            !isRotateButtonDisabled
              ? 'bg-gradient-to-b from-[#FF7933] to-[#FF58E0] text-white py-1.5 shadow-xl shadow-blue-800'
              : 'bg-blue-300'
          }`}
        >
          Zakręć
        </button>

        <button
          onClick={handleLetMeGuess}
          disabled={goodLetters.length < 2 || mode === 'guessing'}
          className=" p-1 px-4 bg-[#65B12C] rounded-[10px] mx-auto disabled:opacity-10 text-white text-[14px] leading-[20px] border-2 border-green-400"
        >
          Rozwiąż
        </button>
      </div>
    </div>
  );
};

export default Buttons;
