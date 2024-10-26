import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import socket from '../socket';

function Lobby() {
  const { roomID } = useParams();

  const [players, setPlayers] = useState([]);
  const [hasJoined, setHasJoined] = useState(false);
  const [afterJoin, setAfterJoin] = useState(false);
  const [userName, setUserName] = useState('');
  const [gameStarting, setGameStarting] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [gameID, setGameID] = useState(null); // New state for gameID
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const [gameOptions, setGameOptions] = useState({
    maxPlayers: 0,
    players: [],
    rounds: 0,
  });

  const handleCopyClick = () => {
    const pageUrl = window.location.href; // Get the current page URL
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this page!',
          text: 'I found this interesting page and wanted to share it with you.',
          url: window.location.href,
        });
      } catch (error) {}
    }
  };

  const joinGame = (name) => {
    if (!hasJoined) {
      socket.emit('joinRoom', { roomID, name }, (response) => {
        if (!response.success) {
          alert(response.message);
        } else {
          setHasJoined(true);
          setAfterJoin(true);
        }
      });
    }
  };

  useEffect(() => {
    const handlePlayerJoined = (options) => {
      setGameOptions(options);
      setPlayers(() => [...options.players]);
    };

    const handlePlayerDisconnect = (players) => {
      setPlayers(() => [...players]);
    };

    const handleGameStarting = ({ gameID }) => {
      setGameStarting(true);
      setGameID(gameID);
    };

    socket.on('playerJoined', handlePlayerJoined);
    socket.on('playerDisconnect', handlePlayerDisconnect);
    socket.on('gameStarting', handleGameStarting);

    return () => {
      socket.off('playerJoined', handlePlayerJoined);
      socket.off('playerDisconnect', handlePlayerDisconnect);
      socket.off('gameStarting', handleGameStarting);
    };
  }, [roomID]);

  useEffect(() => {
    let countdownInterval;
    if (gameStarting) {
      setCountdown(5); // Reset countdown to 5
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(countdownInterval);
            navigate(`/game/${gameID}`);
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => {
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [gameStarting, navigate, gameID]);

  return (
    <>
      {!afterJoin ? (
        <div className="flex flex-col h-full gap-10 justify-center items-center">
          <span className="text-blue-200 text-xl">
            Wpisz swoją nazwę gracza
          </span>
          <input
            type="text"
            className="p-2 px-4 bg-transparent border-blue-300 border-2 rounded-lg text-blue-200"
            placeholder="Twój nick"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button
            disabled={userName.length < 3 || userName.length > 10}
            className="w-4/5 disabled:opacity-40 bg-gradient-to-b from-blue-400 to-blue-600 border-b-4 border-blue-700 text-blue-100 rounded-[8px] text-[18px] hover:from-blue-300 hover:to-blue-500"
            onClick={() => joinGame(userName)}
          >
            Dalej
          </button>
        </div>
      ) : (
        <div className="flex flex-col h-full gap-10 justify-center items-center">
          <div className="flex flex-col gap-6 items-center">
            <span className="text-blue-400 text-lg text-center">
              Poczekalnia - Pokój <br />
              <span className="text-green-400">{roomID}</span>
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleCopyClick}
                className=" w-[150px] text-green-400  border border-green-500 p-1 px-4 rounded-lg"
              >
                {copied ? 'Skopiowany!' : 'Kopiuj link'}
              </button>
              <button
                onClick={handleShareClick}
                className=" w-[150px] text-green-400  border border-green-500 p-1 px-4 rounded-lg"
              >
                Udostępnij
              </button>
            </div>
          </div>

          <ul className="w-full flex flex-col gap-2 items-center justify-center mt-8">
            <span className="text-blue-400">
              Połączeni gracze: {gameOptions.players.length} /{' '}
              {gameOptions.maxPlayers}
            </span>
            {players.map((player) => (
              <li
                key={player.id}
                className="flex items-center gap-4 p-3 py-1 w-[140px] border border-blue-500 rounded"
              >
                <span className="w-[8px] h-[8px] bg-green-500 block animate-ping rounded-full shrink-0"></span>
                <span className="text-blue-300">{player.name}</span>
              </li>
            ))}
          </ul>

          <span className="text-blue-200 text-lg mt-8">
            {gameStarting ? (
              <p className="text-orange-400">
                Gra wystartuje za {countdown}...
              </p>
            ) : (
              <p>Oczekiwanie na pozostałych graczy...</p>
            )}
          </span>
        </div>
      )}
    </>
  );
}

export default Lobby;
