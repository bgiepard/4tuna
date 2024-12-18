// socket.js
import { io } from 'socket.io-client';

// Inicjalizacja Socket.io bezpośrednio z bieżącej domeny
const socket = io({
  // path: '/socket.io',
  path: '/socket.io',
  transports: ['websocket', 'polling'],
  secure: true, // Użyj `true` jeśli frontend jest na HTTPS
  rejectUnauthorized: false, // Użyj tylko do debugowania, NIE w produkcji
});

socket.on('connect', () => {
  console.log('Połączono z WebSocket');
});

socket.on('connect_error', (err) => {
  console.error('Błąd połączenia z WebSocket:', err);
});

socket.on('disconnect', () => {
  console.log('Rozłączono z WebSocket');
});

export default socket;

// import { io } from 'socket.io-client';
//
// const socket = io('http://localhost:5000'); // Adres Twojego serwera
//
// export default socket;
