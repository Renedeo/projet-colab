const express = require('express');
const mysql2 = require('mysql2');

const app = express();
const port = 3000;

// Configuration de la base de données
const db = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Demonone@12345',
  database: 'mydb'
});

// Connexion à la base de données
db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données : ' + err.stack);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Exemple de route pour récupérer tous les utilisateurs
app.get('/produits', (req, res) => {
  db.query('SELECT * FROM produits', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Exemple de route pour ajouter un utilisateur
app.post('/produits', (req, res) => {

  const { Produits, Quantités, Prix } = req.body;
  db.query('INSERT INTO `mydb`.`produits` (`Produits`,`Quantités`,`Prix`) VALUES(?,?,?)', [Produits, Quantités, Prix], (err, result) => {
    if (err) { 
      throw err 
    };
    res.json({ id: result.insertId, Produits, Quantités, Prix });
  });
});

// Écoute du serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
