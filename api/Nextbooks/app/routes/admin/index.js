const express = require('express');
const router = express();
const auth = require('./auth.route')
const account = require('./account.route')
const transcation = require('./transcation.route')

router.use('/auth',auth)
router.use('/account',account)
router.use('/transcation',transcation)

module.exports = router;