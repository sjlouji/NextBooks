const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var cors = require('cors')
var morgan = require('morgan')
const router = require('./app/routes/books/index')
require('dotenv').config()
require('./app/models/books/index')
const app = express()

// Database
mongoose.connect(process.env.BOOKSDATABASEURL, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connection.once('open',function(){
  console.log('Connected to Mongo');
}).on('error',function(err){
  console.log('Mongo Error', err);
})

// Express
app.use(bodyParser.json())
app.use(morgan('combined',))
app.use(cors())

//Routes
app.use('/',router)

app.listen(process.env.BOOKS_PORT,()=>{
  console.log(`Serve is up and running at the port ${process.env.BOOKS_PORT}`)
})