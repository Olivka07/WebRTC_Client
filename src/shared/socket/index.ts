import { io, ManagerOptions, SocketOptions, connect } from 'socket.io-client';

const options: Partial<ManagerOptions & SocketOptions> = {
    forceNew: true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ['websocket']
};

export const socket = connect('http://localhost:3000', options);
socket.on('connection', () => {
    console.log('Соединение установлено');
});
