require('./config/config');
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './config/swagger.json';
import http from 'http'; // nodejs package, require() -> nodejs function

const {
    mongoose
} = require('./db/mongoose_config');

import {
    invoiceRoute
} from './routes/invoice';



const app = express();


mongoose.connect(process.env.MONGODB_URI) // connecting to mongodb db atlas
    .then(() => {
        console.log('connected to db !'); // eslint-disable-line
    })
    .catch(() => {
        console.log('failed to connect to db!'); // eslint-disable-line
    });



app.use(bodyParser.json()); // !middleware which parses incoming request in JSON format, this body-parser middleware must be
// !registered with express so wrote inside app.use();

app.use(bodyParser.urlencoded({ // to parse
    extended: false
}));


// !CORS error-
app.use((req, resp, next) => {
    // before contiuing the request to next middle ware just written below this middleware want to remove CORS error
    resp.setHeader('Access-Control-Allow-Origin', '*'); // allowing access to all the url/paths
    resp.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // it may have this headers key
    resp.setHeader('Access-Control-Expose-Headers', 'max-records, my-token'); // Allowing to custom-header expose to frontend
    resp.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
    next();
});




// !Swagger-UI
// http://localhost:3000/api-docs/
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    explorer: true
}));

// !above code is moved to separate file called router in -> models/posts.js
app.use('/api/invoice', invoiceRoute); // filter routes with '/api/posts' -> redirect to postsRoutes




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


const PORT = normalizePort(process.env.PORT || '3000');

app.set('port', PORT); // setting port

const server = http.createServer(app); // create node server which uses express

server.listen(PORT); // start the server