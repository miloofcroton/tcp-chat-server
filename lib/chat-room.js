module.exports = class ChatRoom {
    constructor() {
        this.users = new Map();
        this.userNumber = 1;
    }

    add(client) {
        const username = client.username = `user${this.userNumber}`;
        this.users.set(username, client);
        this.userNumber++;
    }

    getClient(username) {
        return this.users.get(username);
    }

    rename(userName, newUserName) {

    }
};
