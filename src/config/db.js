const mongoose = require('mongoose');
require('dotenv').config()

const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/profileDatabase'

const db = async ()=>{
    try {
       await mongoose.connect(DB_URI);
       console.log('Profile Database Connected to Mongoose');
    } catch (error) {
        console.error("Error connecting te Mongoose",error);
        process.exit(1);
    }
   
}

module.exports = db;