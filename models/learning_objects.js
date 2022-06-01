const mongoose = require('mongoose');

//https://www.semicolonworld.com/question/47809/mongoose-validate-email-syntax
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const lObjectsSchema = new mongoose.Schema({
    title: { type: String,  required: true, minlength: 4, maxlength: 100 },
    description: { type: String, required: true,  minlength: 10, maxlength: 300 },
    date:  { type: Date, default: Date.now },
    mediaFormat: {
        format: {type: String, enum: ['audio', 'ebook', 'image', 'video', 'website','online article', 'downloadable doc', 'other']},
        icon: String
    },
    language: String,
    url: String,
    authors: [{
        id: {type: String},
        firstName: {type: String, minlength:3, maxlength:30},
        lastName: {type: String, minlength:3, maxlength:30},
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        picture: String,
        webpage: String,
        linkedin: String
    }],
    category: {type: String, enum: ['tutorial', 'workshop', 'article', 'video', 'other']},
    keywords: [String]    
})

module.exports = mongoose.model('LearningObject', lObjectsSchema, 'learningObjects')
