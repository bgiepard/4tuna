import React, { useEffect, useState } from 'react';
import socket from '../socket';

function Lobby({ roomID }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.emit('joinRoom', roomID, (response) => {
      if (!response.success) {
        alert(response.message);
        // Obsługa błędu
      }
    });

    socket.on('playerJoined', (data) => {
      setPlayers((prevPlayers) => [...prevPlayers, data.playerID]);
    });

    socket.on('startGame', (data) => {
      // Przechodzimy do widoku gry
      navigateToGame();
    });

    return () => {
      socket.off('playerJoined');
      socket.off('startGame');
    };
  }, [roomID]);

  return (
    <div>
      <h2>Poczekalnia - Pokój {roomID}</h2>
      <p>Oczekiwanie na graczy...</p>
      <ul>
        {players.map((playerID) => (
          <li key={playerID}>{playerID}</li>
        ))}
      </ul>
    </div>
  );
}

export default Lobby;
