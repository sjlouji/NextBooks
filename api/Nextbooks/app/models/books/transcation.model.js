var mongoose = require('mongoose')
const Schema = mongoose.Schema
const Activity = require('./activity.model')
const bcrypt = require("bcryptjs");
const { boolean, types } = require('@hapi/joi');
const SALT_WORK_FACTOR = 10;


var transcationSchema = new mongoose.Schema({
    debit: {
        type: Boolean,
        default: true,
        required: true,
    },
    amount:{
        type: String,
        default: '0',
        required: true
    },
    description: {
        type: String,
        default: '',
        required: true,
    },
    category: {
        type: String,
        default: '',
        required: true,
    },
    account: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    transcation_type: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Transcation', transcationSchema);
