module.exports = function parseMessage(message) {
    
    if(!message.startsWith('@')) return null;

    const newlineCleaner = /\r|\n/g;
    const msg = message.replace(newlineCleaner, '').split(' ');
    return {
        command: msg[0].split(':')[0].slice(1),
        arg: msg[0].split(':')[1],
        text: msg.slice(1).join(' ')
    };

};
