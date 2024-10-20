// import React, { useEffect } from 'react';
// import socket from '../socket';
//
// function Game() {
//   useEffect(() => {
//     socket.on('gameData', (data) => {
//       // Aktualizacja stanu gry
//     });
//
//     return () => {
//       socket.off('gameData');
//     };
//   }, []);
//
//   const sendGameAction = (action) => {
//     socket.emit('gameAction', action);
//   };
//
//   return (
//     <div>
//       {/* Interfejs gry */}
//       <button onClick={() => sendGameAction('someAction')}>
//         Wykonaj akcję
//       </button>
//     </div>
//   );
// }
