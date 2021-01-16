const express = require('express');
const router = express.Router();
const passportAuth = require('../../controller/admin/auth.controller')
const passport = require('passport')
const { auth }  = require('books-middlewares')

router.post('/login', passportAuth.passportLogin);
router.get('/secret', passport.authenticate('jwt',{ session: false }), auth.isSuperAdmin, passportAuth.passportUser)
router.put('/update', passport.authenticate('jwt',{ session: false }), auth.isSuperAdmin, passportAuth.passportUserUpdate)
router.put('/deactivate',passport.authenticate('jwt',{ session: false }), auth.isSuperAdmin, passportAuth.passportDeactivate)
router.put('/passwordChange', passport.authenticate('jwt',{ session: false }), auth.isSuperAdmin, passportAuth.passportChangePassword)

module.exports = router;