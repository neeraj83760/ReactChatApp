const mongoose = require('mongoose')

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URL)

const db = mongoose.connection;

db.on('connected', ()=>{

    console.log('Mongodb connection sucessfull !')
})

db.on('error', (err)=>{

    console.log('Mongodb connection error, failed');
})

module.exports = db;