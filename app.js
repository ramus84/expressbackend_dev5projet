//Appel de la dépendance express

var express = require('express');

//on affecte la vatiable app à la dépendance express

var app = express();

//Appel de la dépendance body-parser

var bodyParser = require('body-parser');

//Appel pour configuerer le body-parser

app.use(bodyParser.urlencoded({extended: true}));

//Appel de la dépendance dotenv
require('dotenv').config();
 
//Appel de la dépendance monsgoose
var mongoose = require('mongoose');

const url = process.env.DATABASE_URL  

//appel pour se connecter à la base de données

mongoose.connect(url)

// Connexion à MongoDB réussie!
.then(console.log('Mongodb conneted !'))

// Connexion à MongoDB échouée!
.catch(error => console.log(error));

//Appel de la dépendance ejs
app.set('view engine', 'ejs');


const methodOverride = require('method-override');
app.use(methodOverride('_method'));
//on affecte une variable contact à la dépendance contact
//import du modèle contact
var Contact = require('./models/Contact');

//Appel de la dépendance bcrypt

const bcrypt = require('bcrypt');


//import du modèle car
var Car = require('./models/Car');


//import du modèle blog
var Blog = require('./models/Blog');
/*******
 * 
 * 
 * partir contact
 */


app.post('/nouveaucontact', function(req, res){

    //on affecte une variable Data à la dépendance contact pour la création d'un nouveau contact
    const Data = new Contact({

        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        telephone: req.body.telephone,
        adresse : req.body.adresse,
        message: req.body.message
    })

    //on sauvegarde le nouveau contact dans la base de données
    Data.save()
    .then(() => {console.log("Contact saved!")
        //res.send();

        //on redirige vers la page d'accueil et afficher dans la console
        res.redirect('/');
    })
    .catch(error => console.log(error)); 
    
});

//READ
// pour afficher les views de contact
app.get('/', function(req, res){

    // on recuperer data de la liste de contact
    //data de la liste de contact(BD)
    Contact.find().then(personne=> {

        //pour affecter un nom dataHome à la donnée
        //Variable de retour data
        res.render('Home',{data:personne});
    })
    .catch(error => console.log(error));

});

//CREATE
app.get('/formulairecontact',function(req,res){
    res.render('NewContact');
});

//afficher page update
app.get('/contact/:identifiant', function(req, res){
    Contact.findOne({_id:req.params.identifiant})
        //afficher la donnée une seule fois
       //pour parametrer un nom data à la donnée(_id)
       
    .then(data => 
        { res.render('EditContact',{data:data});
    })
    .catch(error => console.log(error));

})

//UPDATE

app.put('/updatecontact/:id', function(req, res){
    const Data = {

        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        telephone: req.body.telephone,
        adresse : req.body.adresse,
        message: req.body.message
    }
    //matching :mise à jour si correspondence entre 
    //l'id présesnt dans la base (-id) et prensent dnas l'Url(params.id)
    Contact.updateOne({_id : req.params.id}, {$set: Data})
    .then((result) => 
        {console.log(result);
        console.log("Contact updated!");
        res.redirect('/');
    })
    .catch(error => console.log(error));
    
})

//DELETE
    app.delete('/deletecontact/:id', function(req, res){

        Contact.deleteOne({
            _id: req.params.id
        })
        .then(() =>{
            console.log("Contact deleted!");
            res.redirect('/');
        })
        .catch(error => console.log(error));
    });
   


//permet de lire le fichier index.html
var path = require('path');

//URL pour afficher le formulaire dans la page d'accueil
app.get('/formulaire', function(req, res){
//on affiche le formulaire dans la page d'accueil
res.sendFile(path.resolve("index.html"));

});

//Appel de la dépendance path

var path = require('path');


// //URL pour la page d'accueil

app.get('/', function(req, res){

//on affiche un messagednas la page d'accueil

    res.send("<html><body><h1>Express c'est génial</h1></body></html>");
});


// //Url pour la page formulaire

app.get('/formulaire', function(req, res){
    
    res.sendFile(path.resolve("index.html"));
 
});


// app.post('/contactform', function(req, res){
//     res.send("Bonjour " + req.body.nom + " " + req.body.prenom + " Merci de nous avoir contacté.<br>Nous reviendrons vers vous " + req.body.email );
// }
// );


// //Url pour la page student

// app.get('/students', function(req, res){

//     //on affiche un messagednas la page d'accueil

//     res.send("<html><body><h1>Page student !</h1></body></html>");
// });


// //Url pour la page submit-name pour recuperer les données du formulaire
// app.post('/submit-name', function(req, res){
//     //console.log(req.body.nom);
//     // console.log("votre nom est : " + req.body.nom + " " + req.body.prenom);
//     // res.send();


//     //recuperer le nom et le prenom du formulaire dans le navigateur
//     res.send("votre nom est : " + req.body.nom + " " + req.body.prenom);

// });

// //on affecte la vatiable port à 5000

// Route pour afficher mon formulaire
app.get('/ajoutblog', function(req, res){
    res.render('NewBlog'); 
});

// rRoute pour enregister/sauvegarger un blog
app.post('/nouveaublog', function(req, res){
    const Data = new Blog({

        sujet: req.body.sujet,
        auteur: req.body.auteur,
        description: req.body.description,
        message: req.body.message,
    
})
    Data.save()
   .then(() => {
    console.log("Blog enrgistré!")
    res.redirect('/allposts');}
)
   .catch(error => console.log(error));

});
//Affichage de tous les blogs
app.get('/allposts', function(req, res){
    Blog.find().then(data => {

        console.log('recuperation donnée reussie');
        res.render('AllPosts',{data:data});
    })
   
});

 //Edit
 app.get('/blog/:id', function(req, res){
    Blog.findOne({_id:req.params.id})
   .then(data => {
    res.render('EditBlog',{data:data});
   
    })
    .catch(error => console.log(error));

 });

 //Update :
 app.put('/updateblog/:id', function(req, res){
    const Data = {

        sujet: req.body.sujet,
        auteur: req.body.auteur,
        description: req.body.description,
        message: req.body.message,
}
    Blog.updateOne({_id : req.params.id}, {$set: Data})
    .then((result) =>  {
        console.log("Blog modifié avec succès !");
        res.redirect('/allposts');
    })
    .catch(error => console.log(error));
})

//Delete
app.delete('/deleteblog/:id', function(req, res){

    Blog.deleteOne({
        _id: req.params.id
    })
   .then(() =>{
    console.log("Blog supprimé !");
    res.redirect('/allposts');
    })
   .catch(error => console.log(error));
});

/*
 * 
 *
 Partie  CAR  
 * 
 * 
 * 
 */

 //import du modèle car
 //lien pour afficher les views de car(le formulaire de création)
 app.get('/newcar', function(req, res){
    res.render('NewCar');
 });

app.post('/newcarsave', function(req, res){

    const Data = new Car({

        mraque : req.body.mraque,
        modele : req.body.modele,
        annee : req.body.annee,
        prix : req.body.prix,
        couleur : req.body.couleur,
        description : req.body.description,
        image : req.body.image,
    })
    Data.save()
    .then(() => {
     console.log("Car enregistré!")
     res.redirect('/allcars');

    })
    .catch(error => console.log(error));

   
});

//Affichage de tous les cars(la totalité des voitures)

app.get('/Allcars', function(req, res){
    Car.find().then(data => {

        console.log('Sauvegarde de données reussie');
        res.render('AllCars',{data:data});

    })
    .catch(error => console.log(error));
   
});

// route pour afficher le formulaire de modification d'un car,en fonction de son id

app.get('/editcar/:id', function(req, res){
    Car.findOne({_id:req.params.id})
   .then(data => {
    res.render('EditCar',{data:data});
   
    })
    .catch(error => console.log(error));

 });
 //route pour mettre à jour un car en fonction de son id

 app.put('/updatecar/:id', function(req, res){

    const Data = {

        mraque : req.body.mraque,
        modele : req.body.modele,
        annee : req.body.annee,
        prix : req.body.prix,
        carburant : req.body.carburant,
        description : req.body.description,
    };

    //route pour mettre à jour un car en foction de son id

    Car.updateOne({_id : req.params.id}, {$set: Data})
    .then((data) =>  {
        console.log("Car modifié avec succès!");
        res.redirect('/allcars');
    })
    .catch(error => console.log(error));

 });
 //route pour supprimer un car en fonction de son id
 app.delete('/deletecar/:id', function(req, res){

    Car.deleteOneAndDelete({
        _id: req.params.id
    })
   .then(() =>{
        console.log("Car supprimé!");
        res.redirect('/allcars');
    })
   .catch(error => console.log(error));
});


/***
 * 
 * 
 * Partie  USERS
 */

//on va créer la views de création d'un utilisateur(nouvelle vue)
//on définit la route pour afficher le formulaire d'inscription

var User = require('./models/Users');
app.get('/inscription', function(req, res){

    res.render('Inscription');
});

//on va traiter la création du nouvel utilisateur
//on ajout un /api/
app.post('/api/newuser', function(req, res){
    //on crée un nouvel utilisateur avec les données du formulaire
      var Data = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        admin: false
      })
       //on enregistre le nouvel utilisateur dans la base de données
      Data.save()
.then(() => {
    console.log("User enregistré!")
    res.redirect('/login');
})
 .catch(error => console.log(error));

})

//on définit la route pour afficher la page de login
app.get('/login',function(req,res){

 //on renvoie la page de login si l'utilisateur n'est pas connecté
    res.render('Login');
   
});

//on va traiter la connexion d'un utilisateur 
app.post('/api/connexion', function(req, res){
    //on récupère les données du formulaire de login
    User.findOne({
        email: req.body.email
    }).then(user => {
        
     //si l'utilisateur s'est trompé et que le mot de passe est incorrect
         if(!user){
             return res.status(404).send( 'User not found : invalid email');

         }
        //  console.log(user);
         

        //  if(!bcrypt.compareSync( req.body.password)){
        //     return res.status(404).send(' Invalid password');
        //  }
        // res.render('Profil', {data: user})
        
        
         //si l'utilisateur est administrateur, on renvoie la page d'admin
        if(user.admin == true){
            res.render('Admin');
        }
        else{
            res.render('Profil', {data: user})
        }

        
    })
    .catch(error => console.log(error));

});
//on va céer un route pour administrer un utilisateur
app.get('/admin', function(req, res){


    //on récupère tous les utilisateurs dans la base de données
    User.find().then(data => {
        res.render('Admin', {data:data});
    })
    .catch(error => console.log(error));
});



 


//on démarre le serveur sur le port 5000
var server = app.listen(5000, function(){

    //on affiche un message dans la console pour indiquer que le serveur est démarré sur le port 5000

    console.log("Server listening on port 5000");

});



