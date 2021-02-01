const express = require('express');
const router = express.Router();
const transcation  = require('../../controller/books/transcation.controller')
const passport = require('passport')
const {isActive} = require('../../middleware/auth/active')

router.get('/',passport.authenticate('jwt',{ session: false }),isActive,transcation.listTranscation)
router.post('/create',passport.authenticate('jwt',{ session: false }),isActive,transcation.createTranscation)
router.post('/delete',passport.authenticate('jwt',{ session: false }),isActive,transcation.deleteTranscationt)
router.post('/update',passport.authenticate('jwt',{ session: false }),isActive,transcation.updateTranscation)

module.exports = router;