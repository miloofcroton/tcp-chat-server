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

    it('assigns names', () => {
        assert.equal(c1.username, 'user1');
        assert.equal(c2.username, 'user2');
        assert.equal(c3.username, 'user3');
    });

    it('gets the client you add', () => {
        let chosenClient = chatroom.getClient('user1');
        assert.ok(chosenClient);
    });

    it('the rename function exists', () => {
        assert.ok(chatroom.rename);
    });

});
