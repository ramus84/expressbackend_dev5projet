
// Importation des modules 
const mongoose = require('mongoose');

const userschema = mongoose.Schema({


    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    admin: {type: Boolean},
});

// on exporte la dépendance mongoose (modèle)

module.exports = mongoose.model('User', userschema);