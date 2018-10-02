/* eslint-disable no-console */

const net = require('net');
const ChatRoom = require('./chat-room');
const parseMessage = require('./parse-message');

const chatroom = new ChatRoom();

module.exports = net.createServer(client => {
    
    console.log('client connected');
    client.setEncoding('utf8');
    chatroom.add(client);
    
    client.write('welcome to the chat!');

    client.on('end', () => {
        console.log('client left');
        chatroom.remove(client.username);
        chatroom
            .all()
            .forEach(c => c.write(`${client.username} has left`));
    });

    client.on('data', data => {
        const message = parseMessage(data);

        switch(message.command) {
            case 'nick':
                chatroom
                    .rename(client.username, message.arg);
                break;
            case 'dm':
                chatroom
                    .getClient(message.arg)
                    .write(`${client.username}: ${message.text}`);
                break;
            case 'all':
                chatroom
                    .all()
                    .filter(c => c.username !== client.username)
                    .forEach(c => c.write(`${client.username}: ${message.text}`));
                break;
            case 'list':
                client
                    .write(`
                write "@all" (no quotes) followed by a message to message everyone in the chatroom (ex. @all hello world!)
                write "@dm:<username>" followed by a message to message a user directly (ex. @dm:exampleuser hey, what's up?)
                write "@nick:<username>" to change your username (ex. @nick:reallycoolusername)`);
                break;
            default:
                client
                    .write('You have entered an invalid command. Enter "@list" to see the list of available commands.');
        }


    });
});
