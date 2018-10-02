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

    rename(username, newusername) {
        const user = this.getClient(username);
        user.username = newusername;
        this.users.set(newusername, user);
        this.users.delete(username);
    }

    // all() {
    //     return [...this.clients.values()];
    // }


};
