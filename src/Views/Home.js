// // src/components/CreateGame.js
// import React, { useState } from 'react';
// import socket from '../socket';
// import { useHistory } from 'react-router-dom';
//
// const CreateGame = () => {
//   const [roomId, setRoomId] = useState('');
//   const history = useHistory();
//
//   const handleCreateGame = () => {
//     socket.emit('createGame');
//     socket.on('gameCreated', ({ roomId }) => {
//       setRoomId(roomId);
//       // Przekierowanie do strony gry z ID pokoju
//       history.push(`/game/${roomId}`);
//     });
//   };
//
//   return (
//     <div>
//       <button onClick={handleCreateGame}>Stwórz grę</button>
//       {roomId && <p>ID Twojego pokoju: {roomId}</p>}
//     </div>
//   );
// };
//
// export default CreateGame;
