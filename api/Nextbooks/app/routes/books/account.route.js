const express = require('express');
const router = express.Router();
const account  = require('../../controller/books/account.controller')
const passport = require('passport')
const {auth} = require('books-middlewares')
const { accountValidation } = require('../../middleware/validators/accountValidation')

router.get('/',passport.authenticate('jwt',{ session: false }), auth.isActive,account.listAccounts)
router.post('/create',passport.authenticate('jwt',{ session: false }), auth.isActive,account.createAccount)
// router.post('/delete',passport.authenticate('jwt',{ session: false }),isActive,account.deleteAccount)
router.post('/update',passport.authenticate('jwt',{ session: false }), auth.isActive,account.updateAccount)

module.exports = router;