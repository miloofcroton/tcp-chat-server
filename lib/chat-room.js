module.exports = class ChatRoom {
    constructor() {
        this.clients = new Map();
        this.userNumber = 1;
    }

    add(client) {
        const username = client.username = `user${this.userNumber}`;
        this.clients.set(username, client);
        this.userNumber++;
    }

    remove(username) {
        this.clients.delete(username);
    }

    getClient(username) {
        return this.clients.get(username);
    }

    rename(username, newusername) {
        const user = this.getClient(username);
        user.username = newusername;
        this.clients.set(newusername, user);
        this.clients.delete(username);
    }

    all() {
        return [...this.clients.values()];
    }


};
