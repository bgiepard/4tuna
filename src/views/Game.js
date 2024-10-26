import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGameContext } from '../gameContext';
import Phrase from '../components/Phrase';
import PieChart from '../components/PieChart';
import Buttons from '../components/Buttons';
import PlayersInfo from '../components/PlayersInfo';
import Keyboard from '../components/Keyboard';

const Game = () => {
  const { gameID } = useParams();
  const { gameInfo, setGameID } = useGameContext();
  const [roundChange, setRoundChange] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      setTimeout(
        () => setRoundChange(gameInfo.round > gameInfo.maxRounds),
        3000
      );
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

  return (
    <div ref={gameContainerRef} className="h-full flex flex-col">
      {roundChange ? (
        <div className="h-full ">
          {gameInfo && gameInfo.round > gameInfo.maxRounds ? (
            <div className="p-4">
              <h1 className="text-center text-white">KONIEC GRY</h1>
              <ul className="flex flex-col mx-5 text-white">
                {gameInfo.players
                  .sort((a, b) => b.total - a.total)
                  .map((player) => (
                    <div key={player.name}>
                      <span>{player.name}</span> - <span>{player.total}</span>
                    </div>
                  ))}
              </ul>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center">
              <h1 className="text-white">Zmiana rundy</h1>
              <ul className="flex flex-col mx-5 mt-3 text-white">
                {gameInfo.players
                  .sort((a, b) => b.total - a.total)
                  .map((player) => (
                    <div key={player.name}>
                      <span>{player.name}</span> - <span>{player.total}</span>
                    </div>
                  ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="h-full flex flex-col justify-between">
          {loading ? (
            <span className="text-white">
              Niestety nie możesz dołączyć do tej gry.
            </span>
          ) : (
            <>
              <Phrase />

              <div className="">
                <div className="flex items-center pb-4">
                  <div className="w-[120px] shrink-0 mr-3">
                    <PlayersInfo />
                  </div>
                  <div className="">
                    <PieChart />
                  </div>
                </div>
                <Buttons />
                <div className="mb-2">
                  <Keyboard />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Game;
