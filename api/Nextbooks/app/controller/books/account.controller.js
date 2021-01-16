const { valid } = require('@hapi/joi');
const { accountValidation, updateAccount } = require('../../middleware/validators/accountValidation')
const Account = require('../../models/books/account.model');
const Transcation = require('../../models/books/transcation.model');
const User = require('../../models/books/user.model');


module.exports = {

    //  Create a new Account
    createAccount: async function(req,res){
        const { account_name, account_type, initialBalance, account_provider, account_id } = req.body

        // Validating Payload with JOI
        const {error} = accountValidation(req.body);
        if(error) return res.status(400).json({"error":error.details[0].message});

        //  Finding If a Account Number Exists
        const validateAccountId = await Account.findOne({user: req.user._id,account_id: account_id})
        if(validateAccountId) return res.status(400).json({"error":"Account Number Exists"})

        try{
            //  Creating an Account Object
            var account = Account({
                account_id: account_id,
                account_name: account_name,
                account_type: account_type,
                initialBalance: initialBalance,
                account_provider: account_provider,
                user: req.user._id,
            })
            
            //  Save account to database
            account.save((err,done)=>{
                if (err) return res.status(500).json({ "error": err })
                return res.status(200).json({'accounts':done})
            })   
        }catch(err){
            return res.status(400).json({ "error": err })
        }

    },

    //  List All the Accounts of owned by the User  
    listAccounts: async function(req,res){
        Account.find({user: req.user._id}).exec(function(err,done){
            if (err) return res.status(400).json({ "error": err })
            return res.status(200).json({"accounts":done})
        })
    },

    //  Delete an Account 
    deleteAccount: async function(req,res){
        const { id } = req.body

        //  Checking if Payload has Id parameter
        if(id === '' || !id) return res.status(400).json({'error':'Provide a Id'})

        //  Validating if Accound exists
        const validate = await Account.findOne({_id: id, user: req.user._id})
        if(!validate) return res.status(404).json({"error":"Account does Not Exists"})

        //  Deleting Account
        Account.findOneAndDelete({_id: id}, (err,data)=>{
            if (err) return res.status(400).json({ "error": err })
            return res.status(200).json({'msg':"Successfull", 'accounts':data})
        })
    },

    //  Update An Account
    updateAccount: async function(req,res){
        let { id, account_name, account_type, account_provider } = req.body

        // Validating Payload with JOI
        const {error} = updateAccount(req.body)
        if(error) return res.status(404).json({"error":error.details[0].message});
        
        //  Validating if Accound exists             
        const validate = await Account.findOne({_id: id, user: req.user._id})
        if(!validate) return res.status(404).json({"error":"Account does Not Exists"})

        //  Data validation
        if(account_name ==='' || !account_name) account_name = validate.account_name
        if(account_type ==='' || !account_type) account_type = validate.account_type
        if(account_provider ==='' || !account_provider) account_provider = validate.account_provider
        
        //  Updating Account details
        Account.findOneAndUpdate({_id: id},{$set:{account_name: account_name, account_type: account_type, account_provider: account_provider}},{new: true},(err,done)=>{
            if (err) return res.status(500).json({ "error": err })
            res.status(200).json({'msg':'Successfull','accounts':done})
        })
    }
}