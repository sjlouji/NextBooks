const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const AdminBro = require('admin-bro')
const AdminBroMongoose = require('@admin-bro/mongoose')
const AdminBroExpressjs = require('@admin-bro/express')
var cors = require('cors')
var morgan = require('morgan')
const router = require('./app/routes/books/index')
require('dotenv').config()
const User = require('./app/models/books/user.model')
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

//Admin Bro
AdminBro.registerAdapter(AdminBroMongoose)
const AdminBroOptions = {
  resources: [User],
}
const adminBro = new AdminBro(AdminBroOptions)
const routers = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    if(email === 'admin@nextbooks.com'){
      if(password === 'admin'){
        return true
      }
    }
    return false
  },
  cookiePassword: 'JoanLouji',
})
app.use(adminBro.options.rootPath, routers)

//Routes
app.use('/',router)

app.listen(process.env.BOOKS_PORT,()=>{
  console.log(`Serve is up and running at the port ${process.env.BOOKS_PORT}`)
})