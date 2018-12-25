const debug = require('debug')('node-angular'); // debug -> given by node
import http from 'http'; // nodejs package, require() -> nodejs function
import {
    app
} from './server/app';



// validating the PORT
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
};

// checks for any Error's
const onError = error => {
    const addr = server.address();
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
};


// logging - we r listing to incoming request
const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;
    debug('Listening on ' + bind);
};


const port = normalizePort(process.env.PORT || '3000');

app.set('port', port); // setting port

const server = http.createServer(app); // create node server which uses express

server.on('error', onError); // registring listeners (this is listening for - errors)
server.on('listening', onListening); // registring listeners (this is listening for - logging any incoming request)

server.listen(port); // start the server