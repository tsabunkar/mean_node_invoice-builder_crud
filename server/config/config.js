const env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {


    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb+srv://tejas-admin:icui4cuNOW@mycluster-0mtaj.mongodb.net/postMessagesdb?retryWrites=true';
    process.env.JWT_SECRET = 'mySalt123!';
    process.env.ENV = 'development';


   /*  const config = require('./config.json');

    if (env === 'development') { // development env
        process.env.PORT = config.development.PORT;
        process.env.MONGODB_URI = config.development.MONGODB_URI;
        process.env.JWT_SECRET = config.development.JWT_SECRET;
        process.env.ENV = config.development.ENV;



    } else { // testing env
        process.env.PORT = config.test.PORT;
        process.env.MONGODB_URI = config.test.MONGODB_URI;
        process.env.JWT_SECRET = config.test.JWT_SECRET;
        process.env.ENV = config.test.ENV;
    } */

}