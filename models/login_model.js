const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');//importing mongoose-unique-validator plugin

//https://www.semicolonworld.com/question/47809/mongoose-validate-email-syntax
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email is a required field'],
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: { type: String, required: [true, 'Password is a required field'], maxlength: 255 },
})

loginSchema.plugin(uniqueValidator);//applying mongoose-unique-validator plugin to schema

module.exports = mongoose.model('Login', loginSchema)
