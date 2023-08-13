const mongoose = require('mongoose')
require('dotenv').config()

const db = process.env.DB_MONGO || 'mongodb://localhost:27017/midterm'

const connectDb = () => {
    mongoose.connect(db)
    const database = mongoose.connection
    
    database.on('error', (error) => {
      console.log(error)
    })
    
    database.once('connected', () => {
      console.log('Database Connected')
    })
}

module.exports = connectDb