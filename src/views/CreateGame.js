import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importujemy hook useNavigate
import socket from '../socket';

function CreateGame() {
  const [options, setOptions] = useState({
    rounds: 1,
    maxPlayers: 2,
  });

  const navigate = useNavigate();

  const handleCreateGame = () => {
    socket.emit('createRoom', options, (response) => {
      if (response.roomID) {
        navigate(`/lobby/${response.roomID}`);
      }
    });
  };

  return (
    <div className="p-4">
      <div className="border p-4 flex gap-4 mb-2">
        <label htmlFor="">Liczba rund</label>
        <input
          type="number"
          value={options.rounds}
          onChange={(e) => setOptions({ ...options, rounds: e.target.value })}
          className="border"
        />
      </div>
      <div className="border p-4 flex gap-4 mb-2">
        <label htmlFor="">Liczba graczy</label>
        <input
          type="number"
          value={options.maxPlayers}
          onChange={(e) =>
            setOptions({ ...options, maxPlayers: e.target.value })
          }
          className="border"
        />
      </div>

      <button
        onClick={handleCreateGame}
        className="text-center w-full bg-blue-300"
      >
        Stwórz grę
      </button>
    </div>
  );
}

export default CreateGame;
