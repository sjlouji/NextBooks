var mongoose = require('mongoose')
const Schema = mongoose.Schema
const Activity = require('./activity.model')
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

var activitySchema = new mongoose.Schema({
    last_login:{
        type: Date,
        default: Date.now(),
    },
    ip: {
        type: String,
        default: ''
    },
    agent: {
        type: String,
        default: ''
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})


var userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    isSuperAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isMember: {
        type: Boolean,
        required: true,
        default: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    password_reset_token: {
        type: String,
        required: false,
        default: ''
    },
    bio: {
        type: String,
        required: false,
        default: ''
    },
    profile_img: {
        type: String,
        required: false,
        default: ''
    },
    logs: [activitySchema],
},{timestamps: true})

module.exports = mongoose.model('User', userSchema);
