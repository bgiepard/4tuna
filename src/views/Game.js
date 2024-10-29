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

  const RoundChangeView = () => {
    return (
      <div className="h-full ">
        {gameInfo && gameInfo.round > gameInfo.maxRounds ? (
          <div className="p-2">
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
    );
  };

  const CantConnectGameView = () => {
    return (
      <span className="text-white">
        Niestety nie możesz dołączyć do tej gry.
      </span>
    );
  };

  const SubheadingView = () => {
    return (
      <div className="px-2 mt-1">
        <div className="flex items-center justify-between">
          <span className="flex items-center justify-center  rounded t text-white uppercase">
            {gameInfo.category}
          </span>
          <span className="flex items-center justify-center  rounded  text-white ">
            Runda&nbsp;
            <span className="text-orange-300 font-bold"> {gameInfo.round}</span>
            &nbsp;/ {gameInfo.maxRounds}
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
            <div className="h-full flex flex-col">
              <>
                <SubheadingView />
                <Phrase />
              </>

              <div className="grow">
                <div className="flex items-center pb-4 relative h-[100%]">
                  <div className="absolute left-0 top-0 right-0 bottom-0">
                    <PlayersInfo />
                  </div>

                  <div className="w-[220px] mx-auto flex items-center justify-center">
                    <PieChart />
                  </div>
                </div>
              </div>

              <>
                <Buttons />
                <div className="mb-2">
                  <Keyboard />
                </div>
              </>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Game;
