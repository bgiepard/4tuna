import React, { useRef } from 'react';
import { useGameContext } from '../gameContext';
const Buttons = () => {
  const { gameInfo, rotateWheel, letMeGuess, nextPlayer } = useGameContext();
  const spinSound = useRef(null);

  const myUserName = localStorage.getItem(`${gameInfo.gameID}userName`);
  const currentPlayerName = gameInfo.players[gameInfo.currentPlayer]?.name;
  const isMyTurn = currentPlayerName && currentPlayerName === myUserName;

  const handleRotateWheel = () => {
    if (spinSound.current) {
      spinSound.current.play(); // Play the sound
    }
    rotateWheel(); // Call the rotateWheel function
  };

  // if (!isMyTurn && currentPlayerName) {
  //   return (
  //     <div className=" text-center text-sm min-h-[48px] flex items-center justify-center">
  //       {gameInfo.mode === 'guessing' ? (
  //         <span className="text-blue-400">
  //           {' '}
  //           {gameInfo.players[gameInfo.currentPlayer].name} próbuje odgadnąć
  //           hasło
  //         </span>
  //       ) : (
  //         <span className="text-orange-400">
  //           Poczekaj na swoją kolej, aktualny gracz:{' '}
  //           {gameInfo.players[gameInfo.currentPlayer].name}
  //         </span>
  //       )}
  //     </div>
  //   );
  // }

  return (
    <div className="">
      <audio ref={spinSound}>
        <source src="/assets/spin.mp3" type="audio/mpeg" />
        <source src="/assets/spin.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

      <div className="flex items-center gap-2 relative z-10 h-[48px]">
        <button
          onClick={nextPlayer}
          disabled={gameInfo.mode === 'rotating'}
          className={`p-1 bg-blue-300 rounded mx-auto disabled:opacity-10`}
        >
          Odpuść
        </button>

        <button
          onClick={handleRotateWheel} // Use the handler to play sound and rotate
          disabled={gameInfo.mode !== 'rotating' || gameInfo.onlyVowels}
          className={`shadow shadow-black p-1 px-6 bg-blue-300 rounded mx-auto disabled:opacity-10 ${gameInfo.mode === 'rotating' && 'bg-gradient-to-b from-orange-500 text-white to-orange-300 py-1.5'}`}
        >
          Zakręć
        </button>

        <button
          onClick={letMeGuess}
          className={`p-1 bg-blue-300 rounded mx-auto disabled:opacity-10 `}
          disabled={
            gameInfo.goodLetters.length < 3 || gameInfo.mode === 'guessing'
          }
        >
          Rozwiąż
        </button>
      </div>
    </div>
  );
};

export default Buttons;
