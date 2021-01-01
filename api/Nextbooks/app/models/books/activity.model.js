
var mongoose = require('mongoose')

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

module.exports = mongoose.model('Activity', activitySchema);
