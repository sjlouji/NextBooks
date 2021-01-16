const express = require('express');
const router = express.Router();
const transcation  = require('../../controller/books/transcation.controller')
const passport = require('passport')
const {auth} = require('books-middlewares')

router.get('/',passport.authenticate('jwt',{ session: false }), auth.isActive,transcation.listTranscation)
router.post('/create',passport.authenticate('jwt',{ session: false }), auth.isActive,transcation.createTranscation)
router.post('/delete',passport.authenticate('jwt',{ session: false }), auth.isActive,transcation.deleteTranscationt)
router.post('/update',passport.authenticate('jwt',{ session: false }), auth.isActive,transcation.updateTranscation)

module.exports = router;