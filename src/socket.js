import { io } from 'socket.io-client';

const socket = io('https://4tuna.pl:3000'); // Adres Twojego serwera

export default socket;
