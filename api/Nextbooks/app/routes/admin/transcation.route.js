const express = require('express');
const router = express.Router();
const transcation  = require('../../controller/admin/transcation.controller')
const passport = require('passport')
const {auth} = require('books-middlewares')

router.get('/',passport.authenticate('jwt',{ session: false }), auth.isSuperAdmin,transcation.listTranscation)
router.post('/create',passport.authenticate('jwt',{ session: false }), auth.isSuperAdmin,transcation.createTranscation)
router.post('/delete',passport.authenticate('jwt',{ session: false }), auth.isSuperAdmin,transcation.deleteTranscationt)
router.post('/update',passport.authenticate('jwt',{ session: false }), auth.isSuperAdmin,transcation.updateTranscation)

module.exports = router;