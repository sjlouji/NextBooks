const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var cors = require('cors')
var morgan = require('morgan')
const app = express()
const envConfig = require('books-config')
const router = require('./app/routes/admin/index')

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
app.use('/admin',router)

app.listen(envConfig.port.BOOKS_ADMIN,()=>{
  console.log(`Admin Server is up and running at the port ${envConfig.port.BOOKS_ADMIN}`)
})