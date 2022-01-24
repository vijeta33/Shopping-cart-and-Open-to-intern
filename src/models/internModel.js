const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return re.test(email)};
    

const internSchema = new mongoose.Schema({
    name: String,
    email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, 'Please fill a valid email address']
},
    mobile: {
        type: Number,
        trim: true,
        unique: true,
        required: 'Mobile Number is required',
        validate: {
            validator: function(mobile) {
                return (/^\d{10}$/.test(mobile))
            },
            message: 'Please fill a valid mobile number',
            isAsync: false
        }
    },
    collegeId: {
        type: ObjectId,
        ref: 'College'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})



module.exports = mongoose.model('Intern', internSchema)