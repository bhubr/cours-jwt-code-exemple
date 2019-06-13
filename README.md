# Introduction aux JWT

## Installation

* Cloner ce repo
* `npm install`
* Copier le contenu de `jwt-key.sample.js` vers `jwt-key.js`, et y mettre une clé personnalisée, par exemple `my-super-secret-key!!` (vous pouvez générer des clés aléatoires avec https://randomkeygen.com/).

## Utilisation

Aller sur https://jwt.io, et dans la partie à droite intitulée "Verify signature", coller votre clé à la place de `your-256-bit-secret`.

Dans la partie payload, changer le champ `name` pour mettre votre nom.

Si vous remplacez `iat` (issued at = date d'émission du token) par `exp` (expiry = date d'expiration du token), vous générerez un token expiré.

Vous pouvez installer l'extension REST Client dans VS Code, ouvrir un nouveau fichier dans lequel vous allez coller ceci (remplacer TOKEN par le token généré par jwt.io):

```
GET http://localhost:5000 HTTP/1.1
Authorization: Bearer TOKEN
```

Ensuite si vous placez le curseur sur la première ligne vous pouvez faire "Send Request" et observer le résultat.

## Relier un front-end

Depuis une application front-end, on peut accéder à une route protégée en envoyant le token dans le header `Authorization` d'une requête.

Avec `fetch` :

```javascript
fetch('/protected-route', {
  method: 'GET',
  headers: {
    // Le token peut venir du state du composant,
    // du state global de Redux...
    Authorization: `Bearer ${token}`
  }
})
  // Le serveur a renvoyé du texte brut
  // via res.send(), s'il avait renvoyé du
  // JSON on aurait utilisé res.json() ici
  .then(res => res.text())
  .then(message => {
    // Utiliser le message
  });
```

Avec `axios` :

```javascript
// On utilise axios différemment ici : on passe
// un objet pour paramétrer la requête ()
axios({
  url: '/protected-route',
  method: 'get',
  headers: {
    Authorization: `Bearer ${token}`
  }
})
  .then(res => res.data)
  .then(message => {
    // Utiliser le message
  });
```