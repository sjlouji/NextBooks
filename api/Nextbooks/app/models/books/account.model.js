var mongoose = require('mongoose')
const Schema = mongoose.Schema
const Activity = require('./activity.model')
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;


var accountSchema = new mongoose.Schema({
    account_name: {
        type: String,
        required: true,
    },
    account_type: {
        type: String,
        enum: ['cash_account', 'bank_account', 'wallet_account'],
        default: 'cash_account',
        required: true,
    },
    initialBalance: {
        type: String,
        default: '0',
        required: true,
    },
    account_provider: {
        type: String,
        required: true,
    },
    account_id: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Account', accountSchema);
