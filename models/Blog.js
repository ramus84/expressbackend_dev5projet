const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({

    sujet: {type:String},
    auteur: {type:String},
    descriptiion: {type:String},
    message: {type:String},

})
//on exporte la dépendance mongoose(modèle)
module.exports = mongoose.model('Blog', blogSchema);