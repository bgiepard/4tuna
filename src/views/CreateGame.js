import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket';

function CreateGame() {
  const [options, setOptions] = useState({
    rounds: 3,
    maxPlayers: 2,
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
      <div className="flex flex-col items-center text-white relative z-10 my-4">
        <span className="font-[800] text-[22px] uppercase px-6 text-center">Wybierz ustawienia swojej gry</span>
      </div>

      <div className="">
        <span className="text-pink-100 mb-2 block">Liczba rund</span>

        <div className="flex gap-4 items-center justify-center">
          <button
            onClick={() => options.rounds > 1 && setOptions({ ...options, rounds: options.rounds - 1 })}
            className="border-2 border-yellow-500 text-2xl text-yellow-300 p-0 h-[40px] w-[40px] flex items-center justify-center rounded-xl bg-white bg-opacity-10"
          >
            <span className="-mt-1">-</span>
          </button>
          <span className="text-white font-bold text-2xl block w-[30px] text-center">{options.rounds}</span>
          <button
            onClick={() => options.rounds < 15 && setOptions({ ...options, rounds: options.rounds + 1 })}
            className="border-2 border-yellow-500 text-2xl text-yellow-300 p-0 h-[40px] w-[40px] flex items-center justify-center rounded-xl bg-white bg-opacity-10"
          >
            +
          </button>
        </div>
      </div>

      <div className="">
        <span className="text-pink-100 mb-2 block">Liczba graczy</span>

        <div className="flex gap-4 items-center justify-center">
          <button
            onClick={() => options.maxPlayers > 2 && setOptions({ ...options, maxPlayers: options.maxPlayers - 1 })}
            className="border-2 border-yellow-500 text-2xl text-yellow-300 p-0 h-[40px] w-[40px] flex items-center justify-center rounded-xl bg-white bg-opacity-10"
          >
            -
          </button>
          <span className="text-white font-bold text-2xl block w-[30px] text-center">{options.maxPlayers}</span>
          <button
            onClick={() => options.maxPlayers < 6 && setOptions({ ...options, maxPlayers: options.maxPlayers + 1 })}
            className="border-2 border-yellow-500 text-2xl text-yellow-300 p-0 h-[40px] w-[40px] flex items-center justify-center rounded-xl bg-white bg-opacity-10"
          >
            +
          </button>
        </div>
      </div>

      <div className="">
        <span className="text-pink-100 mb-2 block">Typ pokoju</span>
        <div className="flex">
          <input
            type="checkbox"
            className=" mr-2"
            value={options.public}
            onClick={() => setOptions({ ...options, public: !options.public })}
            id="public"
          />
          <label htmlFor="public" className="text-md text-white leading-[22px]">
            Widoczny w trybie <br /> 'wylosuj przeciwników'
          </label>
        </div>
      </div>

      <button
        onClick={handleCreateGame}
        className=" px-4 min-w-[180px] h-[45px] font-semibold bg-gradient-to-b from-[#FFD224] to-[#BC9B1B] shadow-md text-white rounded-[8px] text-[14px]  p-0"
      >
        Start
      </button>
    </div>
  );
}

export default CreateGame;
