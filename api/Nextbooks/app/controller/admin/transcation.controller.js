const { valid } = require('@hapi/joi');
const { transcationValidation } = require('../../middleware/validators/admin/transcationValidation')
const Transcation = require('../../models/books/transcation.model');
const Account = require('../../models/books/account.model');
const User = require('../../models/books/user.model');
const moment = require('moment')
module.exports = {

    //  Create a New Transcation
    createTranscation: async function(req,res){
        const { debit, description, category, account, transcation_type, amount, user } = req.body
        let bal;
        // Validating Payload with JOI
        const {error} = transcationValidation(req.body);
        if(error) return res.status(400).json({"error":error.details[0].message});

        const validUser = await User.findOne({_id: user})
        if(!validUser) return res.status(404).json({"error":"User does not Exists"})
        
        //  Finding If a Account Number Exists
        const validateAccountId = await Account.findOne({user: validUser._id,account_id: account})
        if(!validateAccountId) return res.status(400).json({"error":"Account Number does not Exists"})        

        try{
            //  Creating an Transcation Object
            var transcation = Transcation({
                debit: debit,
                description: description,
                category: category,
                account: validateAccountId._id,
                transcation_type: transcation_type,
                user: validUser._id,
                amount: amount,
            })
            
            //  Save transcation to database
            if(debit === true) { 
                bal = parseInt(validateAccountId.initialBalance) - parseInt(amount)
                if(bal < 0) return res.status(500).json({error:'Zero balance'})
            }else{
                bal = parseInt(validateAccountId.initialBalance) + parseInt(amount)
            }
            console.log(bal)
            Account.findOneAndUpdate({user: validUser._id,account_id: validateAccountId.account_id},{initialBalance: bal}, (err,acc)=>{
                transcation.save((errors,done)=>{
                    if (errors) return res.status(500).json({ "error": errors })
                    transcation.populate('account', function(er,book){
                        if (er) return res.status(500).json({ "error": er })
                        return res.status(200).json({'transcations':book})
                    })
                })  
            }) 
        }catch(err){
            return res.status(400).json({ "error": err })
        }
    },

    //  List All the Transcations of owned by the User  
    listTranscation: async function(req,res){
        Transcation.find({}, function(err,done){
            if (err) return res.status(400).json({ "error": err })
            return res.status(200).json({"transcations":done})
        }).populate("account")
    },

    //  Delete a Transcation 
    deleteTranscationt: async function(req,res){
        const { id, user } = req.body
        let bal;
        //  Checking if Payload has Id parameter
        if(id === '' || !id) return res.status(400).json({'error':'Provide a Id'})
        if(user === '' || !user) return res.status(400).json({'error':'User is Invalid'})

        const validUser = await User.findOne({_id: user})
        if(!validUser) return res.status(404).json({"error":"User does not Exists"})
        
        //  Validating if Transcation exists
        const validate = await Transcation.findOne({_id: id, user: validUser._id}).populate('account')
        if(!validate) return res.status(404).json({"error":"Transcation does Not Exists"})

        //  Validating if Accound exists             
        const validateAccount = await Account.findOne({account_id: validate.account.account_id, user: validUser._id})
        if(!validateAccount) return res.status(404).json({"error":"Account does Not Exists"})
        
        if(validate.debit === true) {
            bal = parseInt(validateAccount.initialBalance) + parseInt(validate.amount)
        }else{
            bal = parseInt(validateAccount.initialBalance) - parseInt(validate.amount)
        }
        
        //  Deleting Account
        Account.findOneAndUpdate({user: validUser._id,account_id: validate.account.account_id},{initialBalance: bal}, (err,acc)=>{
            Transcation.findOneAndDelete({_id: id}, (error,data)=>{
                if (error) return res.status(400).json({ "error": error })
                return res.status(200).json({'msg':"Successfull", 'transcations':data})
            })
        })
    },

    //  Update a Transcation
    updateTranscation: async function(req,res){
        let { debit, description, category, account, transcation_type, id, amount, user } = req.body
        let bal;
        // Validating Payload with JOI
        const {error} = transcationValidation(req.body)
        if(error) return res.status(404).json({"error":error.details[0].message});

        //  Checking if Payload has Id parameter
        if(id === '' || !id) return res.status(400).json({'error':'Provide a Id'})
        if(account === '' || !account) return res.status(400).json({'error':'Provide a Account Number'})
        if(user === '' || !user) return res.status(400).json({'error':'Provide User ID'})

        const validUser = await User.findOne({ _id: user })
        if(!validUser) return res.status(404).json({'error':'User Does not Exists'})

        //  Validating if Accound exists             
        const validate = await Transcation.findOne({_id: id, user: validUser._id})
        if(!validate) return res.status(404).json({"error":"Transcation does Not Exists"})
        
        //  Validating if Accound exists             
        const validateAccount = await Account.findOne({account_id: account, user: validUser._id})
        if(!validateAccount) return res.status(404).json({"error":"Account does Not Exists"})

        //  Save transcation to database
        if(debit === true) { 
            let data = parseInt(validateAccount.initialBalance) - parseInt(validate.amount)
            bal = data - parseInt(amount)
            if(bal < 0) return res.status(500).json({error:'Zero balance'})
        }else{
            let data = parseInt(validateAccount.initialBalance) - parseInt(validate.amount)
            bal = data + parseInt(amount)
            if(bal < 0) return res.status(500).json({error:'Zero balance'})
        }

        //  Data validation
        if(description ==='' || !description) description = validate.description
        if(category ==='' || !category) category = validate.category
        if(transcation_type ==='' || !transcation_type) transcation_type = validate.transcation_type
        if(amount ==='' || !amount) amount = validate.amount
        //  Updating Transcation details
        Account.findOneAndUpdate({user: validUser._id,account_id: account},{initialBalance: bal}, (err,acc)=>{
            if (err) return res.status(500).json({ "error": err })
            Transcation.findOneAndUpdate({_id: id},{$set:{debit: debit, description: description, category: category, account: validateAccount._id, transcation_type: transcation_type, amount: amount}},{new: true},(errors,done)=>{
                if (errors) return res.status(500).json({ "error": error })
                res.status(200).json({'msg':'Successfull','transcations':done})
            }).populate('account')
        })
    }
}