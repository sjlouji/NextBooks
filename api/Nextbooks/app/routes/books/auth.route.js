const express = require('express');
const router = express.Router();
const passportAuth  = require('../../controller/books/auth.controller')
const passport = require('passport')

router.post('/login', passportAuth.passportLogin);
router.post('/register', passportAuth.passportRegister);
router.get('/secret', passport.authenticate('jwt',{ session: false }),passportAuth.passportUser)
router.put('/update', passport.authenticate('jwt',{ session: false }),passportAuth.passportUserUpdate)
router.get('/logout', passport.authenticate('jwt',{ session: false }),passportAuth.passportLogout)
router.post('/reset', passportAuth.passportPasswordReset)
router.put('/reset', passportAuth.passportResetPassword)

module.exports = router;