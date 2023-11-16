const socket = require('socket.io');
const { emit } = require('../models/user.model');

module.exports = function (server) {
    const io = socket(server, {
        cors: {
            origin: '*',
        }
    })

    io.on('connection', (socket) => {
        console.log("A new connection");
        socket.on('disconnect', () => {
            console.log('A user disconnect');
        })

        socket.on('order', () => {
            io.emit('updateOrder')
        })

        socket.on('changeStatus', () => {
            io.emit('updateStatus')
        })
    })
}