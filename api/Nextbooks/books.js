const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const AdminBro = require('admin-bro')
const AdminBroMongoose = require('@admin-bro/mongoose')
const AdminBroExpressjs = require('@admin-bro/express')
var cors = require('cors')
var morgan = require('morgan')
const router = require('./app/routes/books/index')
const User = require('./app/models/books/user.model')
const app = express()
const envConfig = require('books-config')

// Database
mongoose.connect(envConfig.mongo.BOOKSDATABASEURL, {useNewUrlParser: true, useUnifiedTopology: true});
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

app.listen(envConfig.port.BOOKS_PORT,()=>{
  console.log(`Serve is up and running at the port ${envConfig.port.BOOKS_PORT}`)
})