const { loginValidation, registervalidation,resetPasswordValidation } = require('../../middleware/validators/authValidation')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const envConfig = require('books-config')
const User = require('../../models/books/user.model')
require('../../../config/passport')

//  Generate Auth Token
let genToken = user => {
    return jwt.sign({
        iss: 'Joan_Louji',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, envConfig.JWT_SECRET.authToken);
}

module.exports = {

    // Passport Login
    passportLogin : async function(req, res){
        const { email, password } = req.body;

        // Validating Payload with JOI
        const {error} =  loginValidation(req.body);
        if(error) return res.status(400).json({"error":error.details[0].message});
        //  Check if user exists
        const userExists = await User.findOne({ email: email }).populate("activity");
        if(!userExists) return res.status(404).json({"error":"User does not exist"})
        if(!userExists.isActive) return res.status(401).json({'error':'Account Deactivated. Contact Admin'})

        //  Validate User
        const validpass = await bcrypt.compare(password,userExists.password)
        if(!validpass) return res.status(404).json({'error':'Invalid Password'})

        // Provide JWT Token
        const token = genToken(userExists)

        // Login Activity
        const doc = {
            last_login: Date.now(),
            ip: JSON.stringify(req.ip),
            agent: req.headers["user-agent"],
        }

        //  Store User Logs
        User.findOneAndUpdate({_id: userExists._id},{$addToSet:{logs: doc}}, { safe: true, upsert: true },function(err,done){
            if (err) return res.status(500).json({ "error": err })          
        }).exec().then((data)=>{
            return res.status(200).json({'user':data,'Token':token})  
        })

    },

    passportSuperAdminRegister: async function(req) {
        const { email, password, first_name, last_name, mobile } = req;
        console.log(email)
        console.log(req)

        // Check if user exists
        const userExists = await User.findOne({ email: email });
        if(userExists) return {error: 'User Exists'}
        
        // HashPassword
        const salt = await bcrypt.genSalt(10)
        const saltPassword = await bcrypt.hash(password,salt)

        // Register User
        try{
            var user = User({
                email: email,
                password: saltPassword,
                first_name: first_name,
                last_name: last_name,
                mobile: mobile,
            })
            
            //  Save user to database
            user.save((err,done)=>{
                if (err) return {error: err}
                // Send Email Welcome Email
                sendEmail(user)
                return {success: 'User Created', email: done.email}
            })          
        }catch(err){
            return {error: err}
        }
        
    },

    // Return the user details
    passportUser : async function(req,res){
        return res.status(200).json({'user':req.user})
    },

    // Update User
    passportUserUpdate: async function(req,res){
        var { first_name, last_name, mobile, bio, profile_img } = req.body;
        // Check if user exists
        const userExists = await User.findOne({ _id: req.user._id });
        if(!userExists) return res.status(500).json({"error":"No Record Found"})
        
        //  Data validation
        if(first_name ==='' || !first_name) first_name = userExists.first_name
        if(last_name ==='' || !last_name) last_name = userExists.last_name
        if(mobile ==='' || !mobile) mobile = userExists.mobile
        if(bio ==='' || !bio) bio = userExists.bio
        if(profile_img ==='' || !profile_img) profile_img = userExists.profile_img

        //  Updates firlds into database
        try{
            User.findOneAndUpdate({_id: req.user._id},{$set: {first_name: first_name, last_name: last_name, mobile: mobile, bio: bio, profile_img: profile_img}},{new: true},function(err,done){
                if (err) return res.status(500).json({ "error": err })
                res.status(200).json({'msg':'Successfull','user':done})
            })
        }catch(err){
            return res.status(500).json({ "error": err })
        }
    },

    //  Deactivate Account
    passportDeactivate: async function (req,res){
        User.findOneAndUpdate({_id: req.user.id},{$set:{isActive: false}}, (err,data)=>{
            if (err) return res.status(400).json({ "error": err })
            return res.status(200).json({'msg':"Successfull",user: data})
        })
    },

    //  Change Password  - For Authenticated Users
    passportChangePassword: async function(req,res){
        const { password } = req.body

        //  Data Validation
        if(password === '' || !password) return res.status(404).json({'error':'Password Field is mandatory'})

        // HashPassword
        const salt = await bcrypt.genSalt(10)
        const saltPassword = await bcrypt.hash(password,salt)
        
        //  Changes password
        User.findOneAndUpdate({_id: req.user._id},{$set:{password: saltPassword}}, (err,done)=>{
            if(err) return res.status(500).json({'error':err})
            return res.status(200).json({'msg':'Successfull', user: done})
        })
    }   
      
}