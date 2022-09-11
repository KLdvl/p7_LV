# Groupomania
## _Création d'un réseau social d'entreprise_

7ème projet de la formation de développeur web d'OpenClassroom.

## Enjeux
---
- Création d'une application intranet.
- Mise en oeuvre d'opérations CRUD de manière sécurisée.
- Authentification d'un utilisateur et maintien de sa session.
- Impémentation d'un stockage de données sécurisé en utilisant une base de données.
- Développeent de l'interface d'un site web grâce à un framework front-end.

## Livrables attendus
---
### Contexte du projet

- Création d'une application web dans laquelle les utilisateurs peuvent ajouter des posts, liker ou disliker les posts ajoutées par les autres.
- Un système de modération via un compte administrateur est disponible.

### Spécifications de l'API

**Création de la partie backend de l'API**

- Utilisation de NodeJs / Express.

- Système C(reate), R(ead), U(pdate), D(elete) fonctionnel.

**Création de la partie frontend de l'API**

- Utilisation du framework React Js.

### Spécifications techniques

**Aspect graphique**
- Respect de l'identité graphique fournie (logo + couleurs + police de caractères).

- Adaptation du support aux desktop, tablettes et mobiles.

**Côté technique**

- Projet réalisé en JavaScript, respecte les standards WCAG.

- Utilisation d'un framework pour le front-end.

- Utilisation de MongoDB comme base de données.

- Readme fourni pour expliquer comment installer le site sur un nouveau poste.

### Spécifications fonctionnelles

**Page de connexion**

- Permet à l'utilisateur de se connecter ou de créer un compte s'il n'en possède pas. La connexion et la création de compte se font à partir de deux élément :

`email` : email de l'employé. <br/>
`password` : mot de passe (avec un nombre minimum de caractères requis, une majuscule, une minuscule, un chiffre et un symbole).

**Détails de la fonctionnalité de connexion**

- Un utilisateur a la possibilité de se déconnecter.
- La session de l'utilisateur persiste pendant qu'il est connecté.
- Les données de connexion sont sécurisées.

**Page d'accueil**

- La page d'accueil liste les posts créés par les différents utilisateurs et sont listé de façon antéchronologique.

**Création d'un post**

- Un utilisateur peut créer un post.
- Un post peut contenir du texte et une image.
- Un utilisateur peut modifier et supprimer ses posts.

**Système de like**

- Un utilisateur peut liker ou disliker un post, une seule fois pour chaque post.

**Rôle administrateur** 

- Afin de pouvoir faire de la modération si nécessaire, un compte administrateur existe. Il a la possibilité de modifier et supprimer tous les posts du réseau social.


## Technologies principales utilisées
---
`Frontend :` 
- [React]
- [NPM] - Version 8.1.2
- [Webstorm] - Editeur de code</br>

`Backend :`
- [NodeJS] - Version 16.13.2
- [Express] - Version 4.18.1
- [Mongoose] - Version 6.3.6
- [Multer] - Version 1.4.5

## Contraintes techniques
---
**Code source**
- Le code source est indenté et utilise des commentaires pour décrire les différentes fonctions et éléments du code.

## Installation
---
# Groupomania #

- Prérequis
Vous devez avoir Node et `npm` installés localement sur votre machine.

###Installation de l'application

Cloner l'application sur la machine qui fera fonctionner le back-end à partir du repository github.
```terminal
git clone https://github.com/KLdvl/p7_lv.git
```

### Démarrage de la partie backend
A partir du répertoire source:
```terminal
cd backend
npm install
nodemon server
```
Le serveur sera lancé et exécuté sur le port 5000 par défaut. <br/>
Il faudra veiller à créer un fichier `.env` similaire à `.env.example` dans le répertoire backend pour lier une base de données au serveur. <br/>

### Démarrage de la partie frontend
A partir du répertoire source:
```terminal
cd frontend
npm install
yarn start
```
L'interface front-end sera alors disponible et exécutée sur le port 3000 par défaut.