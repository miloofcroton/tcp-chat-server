const assert = require('assert');
const ChatRoom = require('../lib/chat-room');

describe('chatroom tests', () => {


    const c1 = {}, 
        c2 = {},
        c3 = {};
    let chatroom = null;

    beforeEach(() => {
        chatroom = new ChatRoom();
        chatroom.add(c1);
        chatroom.add(c2);
        chatroom.add(c3);
    });

    describe('add functionality', () => {
        
        it('assigns names', () => {
            assert.equal(c1.username, 'user1');
            assert.equal(c2.username, 'user2');
            assert.equal(c3.username, 'user3');
        });
    });

    describe('delete functionality', () => {
        
        it('assigns names', () => {
            chatroom.remove('user1');
            chatroom.remove('user3');
            const remaining = chatroom.all();
            assert.equal(remaining.length, 1);
        });
    });

    describe('read functionality', () => {

        it('gets the client you add', () => {
            assert.ok(chatroom.getClient('user1'));
        });
    });

    describe('rename tests', () => {

        it('the rename function exists', () => {
            assert.ok(chatroom.rename);
        });
        it('getting the old username does not work after a rename', () => {
            chatroom.rename('user1', 'banana');    
            assert.ok(!chatroom.getClient('user1'));
        });
        it('getting the new username does work after a rename', () => {
            chatroom.rename('user1', 'banana');    
            let testUser = chatroom.getClient('banana');
            assert.ok(testUser);
        });
        it('the new client has the proper username key and username property', () => {
            chatroom.rename('user1', 'banana');
            let testUser = chatroom.getClient('banana');
            assert.equal(testUser.username, 'banana');
        });
    });

    describe('all() function tests', () => {

        it('returns an array of all clients', () => {

            let clients = chatroom.all();
            let usernames = new Set();
            clients.reduce((acc, curr) => {
                acc.add(curr.username);
                return acc;
            }, usernames);
            assert.equal(clients.length, 3);
            assert.deepEqual([...usernames], ['user1', 'user2', 'user3']);
        });
    });
});
