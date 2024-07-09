const mongoose = require('mongoose');

//On se connecte à la base de données

const carschema = mongoose.Schema({

    marque: {type: String},
    modele: {type: String},
    annee: {type: Number},
    prix: {type: Number},
    description: {type: String},
    image: {type: String},
    couleur: {type: String},
});

//on exporte la dépendance mongoose(modèle)

module.exports = mongoose.model('Car', carschema);
