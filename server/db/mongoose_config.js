// first mongoose file, which will get executed
import mongoose from 'mongoose';

mongoose.Promise = global.Promise; // !By default mongoose uses callback, but if
// !we want to use async-await or promises then this code will specifiy it

const url = process.env.MONGODB_URI;

mongoose.connect(url, { // !remove deprication warning
    useNewUrlParser: true
});
//for production env, we are using the mongodb uri as -> process.env.MONGODB_URI

module.exports = {
    mongoose
};
// !exporting this mongoose, where some operations r perfomed,
//! (now whole application wil be using this mongoose only, rather than importing directly
// !from mongoose libr)