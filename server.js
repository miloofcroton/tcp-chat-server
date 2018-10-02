const app = require('./lib/app');

const port = 1234;

app.on('listening', () => {
    console.log('chat app started on port', PORT);
});

app.listen(port);
