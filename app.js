const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const jwtKey = require('./jwt-key');

const app = express();
app.use(bodyParser.json());

/**
 * Cette route est protégée contre les accès non-autorisés
 */
app.get('/protected-route', (req, res) => {
  // Récupérer le header Authorization
  const auth = req.get('authorization');

  /**
   * Si le header est absent, on ne va pas plus loin,
   * on renvoie une réponse avec code 401 Unauthorized
   * https://developer.mozilla.org/fr/docs/Web/HTTP/Status/401
   */
  if (!auth) {
    return res.status(401).send('Unauthorized');
  }

  /**
   * Le header Authorization est composé de
   * Bearer suivi d'un espace puis du token,
   * on sépare Bearer du token avec le split
   */
  const parts = auth.split(' ');
  // On récupère le token
  const token = parts[1];

  /*
   * jwt.verify prend comme paramètres:
   * 1. le token,
   * 2. la clé importée de jwt-key.js,
   * 3. une fonction (callback) appelée quand la
   * vérification (asynchrone) est terminée
   *
   * Le callback a deux paramètres, err et decoded
   * Si le token est invalide ou expiré, on a une
   * erreur dans err, et rien dans decoded
   * Sinon, err est vide (null) et decoded contient
   * les informations du token
   */
  jwt.verify(token, jwtKey, function (err, decoded) {
    // S'il y a une erreur on renvoie un message d'erreur
    // et le statut 401 comme s'il n'y avait pas de token
    if (err) {
      return res.status(401).send('Invalid or expired token');
    }
    // Sinon on peut renvoyer les informations du token,
    // ou si le token contient l'id de l'utilisateur, s'en servir
    // pour récupérer des informations appartenant à cet utilisateur
    // dans la BDD
    res.send(`Welcome ${decoded.name}`);
  });

});

app.listen(5000);

module.exports = app;
