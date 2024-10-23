import { io } from 'socket.io-client';

const socket = io('http://vps-cabb511a.vps.ovh.net'); // Adres Twojego serwera

export default socket;
