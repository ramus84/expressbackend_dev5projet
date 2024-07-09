//Appel de la dépendance (librairie)  mongoose
const mongoose = require('mongoose');
//MODELE CONTACT
const contactSchema = mongoose.Schema({
nom :{type:String},
prenom :{type:String},
email :{type:String},
telephone :{type:String},
adresse :{type:String},
message :{type:String},

})


//expoter le modèle

module.exports = mongoose.model('Contact',contactSchema);
