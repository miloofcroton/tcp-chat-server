/* eslint-disable no-console */

const net = require('net');
const outdent = require('outdent');
const ChatRoom = require('./chat-room');
const parseMessage = require('./parse-message');

const chatroom = new ChatRoom();



module.exports = net.createServer(client => {
    
    console.log('client connected');
    client.setEncoding('utf8');

    chatroom.add(client);
    
    client.write(outdent`
        welcome to the chat, ${client.username}!
        type @list to see available commands \n
        `);

    client.on('end', () => {
        console.log('client left');
        chatroom
            .remove(client.username);
        chatroom
            .all()
            .forEach(c => c.write(outdent`${client.username} has left \n`));
    });

    client.on('data', data => {
        const message = parseMessage(data);
        console.log(message);

        if(message){

            if(message.command == 'nick'){
                chatroom
                    .rename(client.username, message.arg);
                chatroom
                    .getClient(client.username)
                    .write(outdent`Your username is now ${client.username} \n
                    `);
            }
            else if(message.command == 'dm'){
                let compadre = chatroom.getClient(message.arg);
                if(compadre){
                    compadre.write(outdent`${client.username}: ${message.text} \n
                    `);
                }
                else {
                    client.write(outdent`${message.arg} is not currently logged in! \n
                    `);
                }
            }
            else if(message.command == 'all'){
                chatroom
                    .all()
                    .filter(c => c.username !== client.username)
                    .forEach(c => c.write(outdent`${client.username}: ${message.text} \n
                    `));
            }
            else if(message.command == 'party'){
                chatroom
                    .all()
                    .forEach(u => client.write(outdent`${u.username} \n
                    `));                    
            }
            else if(message.command == 'whoami'){
                chatroom
                    .getClient(client.username)
                    .write(outdent`Your username is ${client.username} \n
                    `);
            }
            else if(message.command == 'exit'){
                client.end();
            }
            else if(message.command == 'list'){
                chatroom
                    .getClient(client.username)
                    .write(outdent`
                        write "@all" (no quotes) followed by a message to message everyone in the chatroom (ex. @all hello world!)
                        write "@dm:<username>" followed by a message to message a user directly (ex. @dm:exampleuser hey, what's up?)
                        write "@nick:<username>" to change your username (ex. @nick:reallycoolusername)
                        write "@party" to get a list of all current users
                        write "@whoami" to get your current username
                        write "@exit" to leave the chatroom \n
                    `);
            }
            else {
                client
                    .write('You have entered an invalid command. Enter "@list" to see the list of available commands. \n');
            }
        }


    });
});
