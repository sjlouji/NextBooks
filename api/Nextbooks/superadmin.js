const prompt = require('prompt');
const mongoose = require('mongoose')
const envConfig = require('books-config')
const User = require('./app/models/books/user.model')
const bcrypt = require("bcryptjs");

// Database
mongoose.connect(envConfig.mongo.BOOKSDATABASEURL, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connection.once('open',function(){
  
}).on('error',function(err){
  console.log('Mongo Error', err);
})


const properties = [
    {
        name: 'email',
    },
    {
        name: 'password',
        hidden: true
    },
    {
        name: 'first_name'
    },
    {
        name: 'last_name'
    },
    {
        name: 'mobile'
    }
];

prompt.start();

prompt.get(properties, async function (err, result) {
    if (err) { return onErr(err); }
    // Check if user exists
    const userExists = await User.findOne({ email: result.email });
    if(userExists) {
        return onErr('User Exists')
    }

    // HashPassword
    const salt = await bcrypt.genSalt(10)
    const saltPassword = await bcrypt.hash(result.password,salt)

    // Register User
    try{
        var user = User({
            email: result.email,
            password: saltPassword,
            first_name: result.first_name,
            last_name: result.last_name,
            mobile: result.mobile,
            isAdmin: true,
            isSuperAdmin: true,
        })
        
        //  Save user to database
        user.save((error,done)=>{
            if (err) return {error: error}
            return onSucc('User Created')
        })          
    }catch(error){
        return onErr(error)
    }
});

function onSucc(data) {
    console.log(data)
    prompt.stop();
    return 1;
}

function onErr(err) {
    console.log(err);
    prompt.stop();
    return 1;
}


