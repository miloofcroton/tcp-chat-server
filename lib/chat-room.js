module.exports = class ChatRoom {
    constructor() {
        this.map = new Map();
        this.userNumber = 1;
    }

    add(client) {
        const username = client.username = `user${this.userNumber}`;
        this.map.set(username, client);
        this.userNumber++;
    }

    getClient(username) {
        return this.map.get(username);
    }
};
