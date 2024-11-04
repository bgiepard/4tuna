import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket';

function SoloGame() {
  const [options, setOptions] = useState({
    rounds: 3,
    maxPlayers: 2,
    solo: true,
    public: false,
  });

  const navigate = useNavigate();

  const handleCreateGame = () => {
    socket.emit('createRoom', options, (response) => {
      if (response.roomID) {
        navigate(`/lobby/${response.roomID}`);
      } else {
        console.log('response from socket', response);
      }
    });
  };

  return (
    <div className="flex flex-col h-full gap-10 justify-center items-center">
      <span className="text-blue-200 text-xl">Wybierz ustawienia swojej gry</span>
      <div className="">
        <span className="text-blue-300 mb-2 block">Liczba rund</span>

        <div className="flex gap-4 items-center justify-center">
          <button
            onClick={() => options.rounds > 1 && setOptions({ ...options, rounds: options.rounds - 1 })}
            className="border border-blue-300 text-2xl text-blue-200 p-0 h-[40px] w-[40px] flex items-center justify-center rounded-xl"
          >
            -
          </button>
          <span className="text-green-500 font-bold text-2xl block w-[30px] text-center">{options.rounds}</span>
          <button
            onClick={() => options.rounds < 10 && setOptions({ ...options, rounds: options.rounds + 1 })}
            className="border border-blue-300 text-2xl text-blue-200 p-0 h-[40px] w-[40px] flex items-center justify-center rounded-xl"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleCreateGame}
        className="w-4/5  bg-gradient-to-b from-blue-400 to-blue-600 border-b-4 border-blue-700 text-blue-100 rounded-[8px] text-[18px] hover:from-blue-300 hover:to-blue-500"
      >
        Dalej
      </button>
    </div>
  );
}

export default SoloGame;
