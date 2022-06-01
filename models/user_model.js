const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');//importing mongoose-unique-validator plugin

//https://www.semicolonworld.com/question/47809/mongoose-validate-email-syntax
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const usersSchema = new mongoose.Schema({
    firstName: { type: String, required: 'First Name is required', maxlength: 100 },
    lastName: { type: String, required: 'Last Name is required', maxlength: 100 },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: { type: String, required: 'Password is required', maxlength: 255 },

});

usersSchema.plugin(uniqueValidator);//applying mongoose-unique-validator plugin to schema

module.exports = mongoose.model('Users', usersSchema, 'usersCollection')
