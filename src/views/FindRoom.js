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
                <button
                  className="p-2 border mb-2"
                  key={room.roomID}
                  onClick={() => navigate(`/lobby/${room.roomID}`)}
                >
                  Rundy: {room.maxRounds}, Liczba graczy: {room.players} /{' '}
                  {room.maxPlayers}
                </button>
              ))}
            </ul>
          </>
        ) : (
          <>
            <span>Brak publicznych gier</span>
          </>
        )}
      </div>
    </div>
  );
}

export default FindRoom;
