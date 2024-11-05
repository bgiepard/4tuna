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
          title: 'Dołącz do gry',
          text: 'Czekamy na Ciebie - pokaż co potrafisz!',
          url: window.location.href,
        });
      } catch (error) {}
    }
  };

  const joinGame = (name) => {
    saveToLocalStorage('nickName', name);
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

  const saveToLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  };

  const readFromLocalStorage = (key) => {
    try {
      const savedValue = localStorage.getItem(key);
      return savedValue ? JSON.parse(savedValue) : null;
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return null;
    }
  };

  useEffect(() => {
    const storedNickname = readFromLocalStorage('nickName');
    if (storedNickname) {
      setUserName(storedNickname);
    }
  }, []);

  return (
    <>
      {!afterJoin ? (
        <div className="flex flex-col h-full gap-14 justify-center items-center">
          <div className="flex flex-col items-center text-white relative z-10 ">
            <span className="font-[800] text-[22px] uppercase px-6 text-center">Wpisz swoją nazwę gracza</span>
          </div>
          <input
            type="text"
            className="p-2 px-4 max-w-[200px] bg-transparent border-2 rounded-lg text-white font-semibold border-[#FFD224] text-center placeholder:text-pink-200 bg-white bg-opacity-10 outline-none"
            placeholder="Twój nick"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <button
            onClick={() => joinGame(userName)}
            disabled={userName.length < 3 || userName.length > 10}
            className="px-4 min-w-[180px] h-[45px] font-semibold bg-gradient-to-b from-[#FFD224] to-[#BC9B1B] shadow-md text-white rounded-[8px] text-[14px] disabled:grayscale"
          >
            Dołącz
          </button>
        </div>
      ) : (
        <div className="flex flex-col h-full gap-10 justify-center items-center">
          <div className="flex flex-col gap-6 items-center">
            <div className="flex flex-col items-center text-white relative z-10 mt-4 -mb-6">
              <span className="font-[800] text-[28px] uppercase">Poczekalnia</span>
              <span className="opacity-100 font-[600] text-[14px] uppercase -mt-1">
                Pokój gracza: <span className="text-yellow-300">{gameOptions?.players?.[0].name}</span>
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCopyClick}
              className=" px-4 min-w-[160px] h-[35px] font-semibold bg-gradient-to-b from-[#FFD224] to-[#BC9B1B] shadow-md text-white rounded-[8px] text-[14px]  p-0"
            >
              {copied ? 'Skopiowany!' : 'Kopiuj link'}
            </button>
            <button
              onClick={handleShareClick}
              className=" px-4 min-w-[160px] h-[35px] font-semibold bg-gradient-to-b from-[#FFD224] to-[#BC9B1B] shadow-md text-white rounded-[8px] text-[14px]  p-0"
            >
              Udostępnij
            </button>
          </div>

          <ul className="w-full flex flex-col gap-2 items-center justify-center mt-8">
            <span className="font-[600] text-[14px] uppercase text-white">Połączeni gracze:</span>

            {Array.from({ length: gameOptions.maxPlayers }).map((_, index) => {
              const player = players[index];
              return player ? (
                <li
                  key={player.id}
                  className="flex items-center gap-4 p-3 py-1 w-[180px] border border-green-500 bg-white bg-opacity-10 rounded text-white"
                >
                  <span className="w-[8px] h-[8px] bg-green-500 block animate-ping rounded-full shrink-0"></span>
                  <span>{player.name}</span>
                </li>
              ) : (
                <li key={index} className="flex items-center gap-4 p-3 py-1 w-[180px] bg-gray-700 bg-opacity-15 rounded text-gray-400 animate-pulse">
                  <span className="w-[8px] h-[8px] block rounded-full shrink-0"></span>
                  <span>&nbsp;</span>
                </li>
              );
            })}
          </ul>

          {gameStarting ? (
            <span className="font-[600] text-[16px] text-white animate-bounce">Gra wystartuje za {countdown}s</span>
          ) : (
            <span className="font-[600] text-[14px] text-white animate-pulse">Oczekiwanie na pozostałych graczy...</span>
          )}
        </div>
      )}
    </>
  );
}

export default Lobby;
