import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import socket from '../socket';

function Lobby() {
  const { roomID } = useParams();
  const [players, setPlayers] = useState([]);
  const [hasJoined, setHasJoined] = useState(false); // Nowy stan, który kontroluje, czy gracz dołączył

  const [afterJoin, setAfterJoin] = useState(false);
  const [userName, setUserName] = useState('');

  const [gameStarting, setGameStarting] = useState(false);
  const navigate = useNavigate();

  const joinGame = (name) => {
    if (!hasJoined) {
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
    socket.on('playerJoined', (data) => {
      setPlayers(() => [...data.players]);
    });

    socket.on('playerDisconnect', (data) => {
      setPlayers(() => [...data.players]);
    });

    socket.on('startGame', (data) => {
      console.log('data', data);
      setGameStarting(true);

      setTimeout(() => {
        console.log('start time out');
        navigate(`/game/${data.room.id}`);
      }, 5000);
    });

    return () => {
      socket.off('playerJoined');
      socket.off('startGame');
    };
  }, [roomID, hasJoined]);

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
            JOIN GAME
          </button>
        </>
      ) : (
        <>
          <h2>Poczekalnia - Pokój {roomID}</h2>
          <>
            <p>
              {gameStarting
                ? 'Gra zaraz się zacznie'
                : 'Oczekiwanie na graczy...'}
            </p>
            <ul>
              {players.map((player) => (
                <li key={player.id}>{player.name}</li>
              ))}
            </ul>
          </>
        </>
      )}
    </div>
  );
}

export default Lobby;
