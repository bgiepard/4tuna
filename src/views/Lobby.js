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
  const [countdown, setCountdown] = useState(5); // New state for countdown
  const navigate = useNavigate();

  const joinGame = (name) => {
    if (!hasJoined) {
      localStorage.setItem('userName', name);
      socket.emit('joinRoom', { roomID, name }, (response) => {
        if (!response.success) {
          alert(response.message);
        } else {
          setHasJoined(true);
        }
      });
      setAfterJoin(true);
    }
  };

  useEffect(() => {
    // Event when a player joins the room
    socket.on('playerJoined', (players) => {
      setPlayers(() => [...players]);
    });

    // Event when a player disconnects from the room
    socket.on('playerDisconnect', (room) => {
      setPlayers(() => [...players]);
    });

    // Event when the game is starting
    socket.on('startGame', ({ gameID }) => {
      console.log('id', gameID);
      setGameStarting(true);

      // Start the countdown
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(countdownInterval);
            navigate(`/game/${gameID}`);
          }
          return prevCountdown - 1;
        });
      }, 1000);
    });

    return () => {
      socket.off('playerJoined');
      socket.off('startGame');
    };
  }, [roomID, hasJoined, navigate]);

  return (
    <div>
      {!afterJoin ? (
        <>
          <div className="flex gap-2 p-4">
            <span>Ustaw swój nick</span>
            <input
              type="text"
              className="border"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-blue-300"
            onClick={() => joinGame(userName)}
          >
            Dołącz do gry
          </button>
        </>
      ) : (
        <>
          <h2>Poczekalnia - Pokój {roomID}</h2>
          <div>
            {gameStarting ? (
              <p>Gra zaraz się zacznie w {countdown} sekund...</p>
            ) : (
              <p>Oczekiwanie na graczy...</p>
            )}
          </div>
          <ul>
            {players.map((player) => (
              <li
                key={player.id}
                className="flex items-center gap-2 p-3 border"
              >
                <span className="w-[8px] h-[8px] bg-green-500 block animate-ping rounded-full"></span>
                <span>{player.name}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Lobby;
