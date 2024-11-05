import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket';

function FindRoom() {
  const navigate = useNavigate();
  const [availableRooms, setAvailableRounds] = useState([]);

  useEffect(() => {
    const myID = socket.id;
    socket.emit('findRoom', { myID }, (response) => {
      setAvailableRounds(response.rooms);
      console.log('response', response);
      // if (response.success) {
      //   navigate(`/lobby/${response.roomID}`);
      // } else {
      //   alert('Brak pokoi');
      // }
    });
  }, []);

  return (
    <div className="flex flex-col h-full gap-10 justify-center items-center">
      <div className="text-white">
        {availableRooms?.length ? (
          <>
            <span>Wybierz pokój</span>
            <ul className="flex flex-col">
              {availableRooms.map((room) => (
                <button className="p-2 border mb-2" key={room.roomID} onClick={() => navigate(`/lobby/${room.roomID}`)}>
                  Rundy: {room.maxRounds}, Liczba graczy: {room.players} / {room.maxPlayers}
                </button>
              ))}
            </ul>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center text-white relative z-10 mt-4 -mb-6">
              <span className="opacity-80 font-[800] text-[24px] uppercase -mt-2 animate-pulse">Wyszukiwanie rywali</span>
              <span className="opacity-60 font-[700] text-[22px] uppercase -mt-1 animate-pulse">Odśwież stronę</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FindRoom;
