const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true

    },
    role: {
        type: String,
        default: 'basic',
        enum: ["basic", "supervisor", "admin"]
    },
    accessToken: {
        type: String
    },
    dayMeeting:{
        type:String,
        default: 'Sunday',
        enum: ["Sunday", "Monday", "Tusday","Wednesday","Thursday","Friday","Saturday"]
    },
    timeMeeting:{
        type:String,
        default:"4pm",
        enum:["12pm","1pm","2pm","3pm","4pm"]
    }


});

const User = mongoose.model('user', UserSchema);

module.exports = User;