import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGameContext } from '../gameContext';
import Phrase from '../components/Phrase';
import PieChart from '../components/PieChart';
import Buttons from '../components/Buttons';
import PlayersInfo from '../components/PlayersInfo';
import Keyboard from '../components/Keyboard';
import socket from '../socket';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Game = () => {
  const { gameID } = useParams();
  const { gameInfo, setGameID } = useGameContext();
  const [roundChange, setRoundChange] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const currentPlayerId = gameInfo?.players?.length > 0 && gameInfo?.players[gameInfo?.currentPlayer]?.id;
  const isMyTurn = gameInfo?.players?.length > 0 && currentPlayerId && currentPlayerId === socket.id;

  const gameContainerRef = useRef(null); // Ref to the container you want to fullscreen

  const prevRoundRef = useRef();

  useEffect(() => {
    if (gameID) {
      setGameID(gameID);
    }
  }, [gameID]);

  useEffect(() => {
    const prevRound = prevRoundRef.current;
    if (prevRound !== undefined && gameInfo && gameInfo.round !== prevRound) {
      setRoundChange(true);
      setTimeout(() => setRoundChange(gameInfo.round > gameInfo.maxRounds), 3000);
    }
    if (gameInfo) {
      prevRoundRef.current = gameInfo.round;
    }

    if (gameInfo.players?.length > 1) {
      setLoading(false);
    }

    if (gameInfo.mode === 'gameover') {
      alert('No players left in the game. Returning to home page.');
      navigate('/'); // Redirect to the home page or appropriate route
    }
  }, [gameInfo]);

  const RoundChangeView = () => {
    const { width, height } = useWindowSize();
    const [progress, setProgress] = useState(100);

    useEffect(() => {
      const duration = 3000; // Total duration in milliseconds
      const intervalTime = 50; // Interval time in milliseconds
      const decrement = (intervalTime / duration) * 100; // Amount to decrement each interval

      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - decrement;
          return newProgress <= 0 ? 0 : newProgress;
        });
      }, intervalTime);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="h-full ">
        {gameInfo && gameInfo.round > gameInfo.maxRounds ? (
          <div className="h-full flex flex-col items-center justify-center">
            {/* Fireworks/Confetti effect */}
            <Confetti width={width} height={height} numberOfPieces={500} gravity={0.05} recycle={false} />
            <div className="flex flex-col items-center text-white relative z-10 mt-4 mb-4">
              <span className="font-[800] text-[28px] uppercase">KONIEC GRY!</span>
              <span className="opacity-60 font-[800] text-[22px] uppercase -mt-1">Wygrał gracz</span>
            </div>
            <ul className="flex flex-col mx-5 text-white w-[200px]">
              {[...gameInfo.players]
                .sort((a, b) => b.total - a.total)
                .map((player, index) => (
                  <div
                    key={player.name}
                    className={`p-1 border-2 mb-4 rounded  ${index === 0 && 'p-3 shadow-xl bg-white border-yellow-300 text-white bg-opacity-15 opacity-100 !mb-12'} ${index !== 0 && 'border-orange-400  text-orange-200 p-2.5 shadow-lg bg-white bg-opacity-5 opacity-100'} `}
                  >
                    <span className="font-bold mr-4">{player.total}</span> <span>{player.name}</span>
                  </div>
                ))}
            </ul>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="flex flex-col items-center text-white relative z-10 mt-4 mb-4">
              <span className="font-[800] text-[28px] ">
                KONIEC RUNDY <span className="text-yellow-300">{gameInfo.round - 1}</span> z {gameInfo.maxRounds}!
              </span>
              <span className="opacity-60 font-[800] text-[22px]  -mt-1">Aktualny ranking:</span>
            </div>
            <ul className="flex flex-col mx-5 text-white w-[200px]">
              {[...gameInfo.players]
                .sort((a, b) => b.total - a.total)
                .map((player, index) => (
                  <div
                    key={player.name}
                    className={`p-1 border-2 mb-4 rounded  ${index === 0 && 'p-3 shadow-xl bg-white border-yellow-300 text-white bg-opacity-15 opacity-100 !mb-12'} ${index !== 0 && 'border-orange-400  text-orange-200 p-2.5 shadow-lg bg-white bg-opacity-5 opacity-100'} `}
                  >
                    <span className="font-bold mr-4">{player.total}</span> <span>{player.name}</span> <span></span>
                  </div>
                ))}
            </ul>

            <div className="relative w-1/2 h-2 bg-white bg-opacity-10 mt-4 rounded-full overflow-hidden">
              <div
                className=" left-0 top-0 h-full bg-gradient-to-r from-yellow-300 to-yellow-500 transition-all duration-[50ms]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const CantConnectGameView = () => {
    return <span className="text-white">Niestety nie możesz dołączyć do tej gry.</span>;
  };

  const SubheadingView = () => {
    return (
      <div className="px-2 mt-1">
        <div className="flex items-center justify-center">
          <span className="flex items-center justify-center rounded text-white uppercase border border-pink-200 px-6 py-1 font-semibold text-[14px]">
            {gameInfo.category}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div ref={gameContainerRef} className="h-full flex flex-col">
      {roundChange ? (
        <RoundChangeView />
      ) : (
        <div className="h-full flex flex-col">
          {loading ? (
            <CantConnectGameView />
          ) : (
            <div className="h-full flex justify-between flex-col p-1">
              <div className="h-[50vh]">
                <div className="mb-1">
                  <SubheadingView />
                </div>
                <div className="mb-2">
                  <Phrase phraseComplete={gameInfo.mode === 'phraseRevealed'} />
                </div>
                <div className="">
                  <PlayersInfo />
                </div>
                <div className="pt-8 pb-2 flex items-center justify-center text-white text-[16px]">
                  {!isMyTurn && (
                    <>
                      {gameInfo.mode == 'guessing' ? (
                        <span className="text-orange-300">
                          <span className="text-white">{gameInfo?.players[gameInfo?.currentPlayer].name}</span> próbuje rozwiązać hasło
                        </span>
                      ) : (
                        ' Poczekaj na swoją kolej'
                      )}
                    </>
                  )}

                  {isMyTurn && gameInfo.onlyVowels && <span className="text-yellow-300">Zostały same samogłoski! Rozwiąż hasło</span>}
                </div>
              </div>

              <div
                className={`flex flex-col justify-end relative transition-all duration-500 ${gameInfo.mode === 'rotating' ? 'min-h-[120px]' : 'min-h-[250px]'}`}
              >
                <div className={`-translate-y-1/2 mx-auto absolute top-0 left-0 right-0`}>
                  <PieChart />
                </div>

                <div className={`absolute top-0 left-0 right-0 -translate-y-1/2 transition-all duration-500 z-20 `}>
                  <Buttons />
                </div>

                <div className={`p-1 transition-all duration-500 ${gameInfo.mode === 'rotating' ? 'scale-0' : 'scale-100'}`}>
                  <Keyboard />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Game;
