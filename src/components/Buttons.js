import React, { useEffect, useRef, useState } from 'react';
import { useGameContext } from '../gameContext';
import socket from '../socket';

const Buttons = () => {
  const { gameInfo, rotateWheel, letMeGuess, nextPlayer } = useGameContext();
  const spinSound = useRef(null);
  const myTurnSound = useRef(null);

  const { players, currentPlayer, mode, onlyVowels, goodLetters } = gameInfo;
  const currentPlayerId = players[currentPlayer]?.id;
  const isMyTurn = currentPlayerId && currentPlayerId === socket.id;

  const [rotateClicked, setRotateClicked] = useState(false);

  useEffect(() => {
    setRotateClicked(false);
  }, [gameInfo.mode, gameInfo.currentPlayer]);

  const handleRotateWheel = () => {
    if (rotateClicked) return;
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

  useEffect(() => {
    if (isMyTurn) {
      if (myTurnSound.current) {
        myTurnSound.current.play();
      }
    }
  }, [isMyTurn]);

  const isRotateButtonDisabled = mode !== 'rotating' || onlyVowels;

  return (
    <div className="">
      <audio ref={spinSound}>
        <source src="/assets/spin.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <audio ref={myTurnSound}>
        <source src="/assets/myTurn.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {isMyTurn && gameInfo.mode !== 'phraseRevealed' ? (
        <>
          <div className="flex items-center justify-around gap-2 z-10 relative">
            <button
              onClick={handleNextPlayer}
              disabled={mode === 'rotating' && !onlyVowels}
              className={`transition-all duration-500 ${gameInfo.mode === 'rotating' ? '-translate-y-[80px]' : ''}  w-[100px] p-1 px-4 bg-[#C64CB9] rounded-[10px]  disabled:opacity-10 text-white text-[14px] leading-[20px] border-2 border-pink-300`}
            >
              Odpuść
            </button>

            <button
              onClick={handleRotateWheel}
              disabled={isRotateButtonDisabled}
              className={`w-[80px] h-[80px] top-[10vh] rounded-full border-2 flex items-center justify-center disabled:opacity-0 ${
                !isRotateButtonDisabled ? 'bg-gradient-to-b from-[#FF7933] to-[#FF58E0] text-white' : 'bg-blue-300'
              }
              ${rotateClicked ? '' : ''}
          `}
            >
              Zakręć
            </button>

            <button
              onClick={handleLetMeGuess}
              disabled={goodLetters.length < 2 || mode === 'guessing'}
              className={`transition-all duration-500 ${gameInfo.mode === 'rotating' ? '-translate-y-[80px]' : ''}  w-[100px]  p-1 px-4 bg-[#65B12C] rounded-[10px] disabled:opacity-10 text-white text-[14px] leading-[20px] border-2 border-green-400 ${gameInfo.onlyVowels && 'animate-bounce'}`}
            >
              Rozwiąż
            </button>
          </div>
        </>
      ) : (
        <>
          <span></span>
        </>
      )}
    </div>
  );
};

export default Buttons;
