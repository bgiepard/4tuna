import { io } from 'socket.io-client';

const socket = io('https://4tuna.pl', {
  transports: ['websocket', 'polling'],
});

socket.on('connect', () => {
  console.log('Connected to WebSocket');
});

socket.on('connect_error', (err) => {
  console.error('WebSocket connection error:', err);
});

export default socket;
