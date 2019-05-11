const app = require('./lib/app');

const PORT = 1234;

app.on('listening', () => {
    console.log('chat app started on port', PORT);
});

app.listen(PORT);
