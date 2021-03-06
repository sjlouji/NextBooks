const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var cors = require('cors')
var morgan = require('morgan')
const router = require('./app/routes/sso/index')
require('dotenv').config()
const app = express()

// Database
mongoose.connect(process.env.SSODATABASEURL, {useNewUrlParser: true, useUnifiedTopology: true});
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
app.get('/',(req,res)=>{
  console.log('Headers: ' + JSON.stringify(req.headers));
  console.log('IP: ' + JSON.stringify(req.ip));


  console.log("Browser: " + req.headers["user-agent"]);
  console.log("Language: " + req.headers["accept-language"]);

  res.send('Hello world')
})

app.listen(process.env.SSO_PORT,()=>{
  console.log(`SSO Serve is up and running at the port ${process.env.SSO_PORT}`)
})