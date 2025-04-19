# lafabrique-frontend
<p align="center">
  <img src="https://github.com/MathildePestie/lafabrique-frontend/blob/main/public/images/logo.png?raw=true" alt="La Fabrique Logo" width="250"/>
</p>

# lafabrique-frontend

Bienvenue dans le frontend de **La Fabrique**, une application e-retail dédiée à la personnalisation de fournitures artistiques : crayons, peintures, aérosols et marqueurs.

Conçue comme une **expérience immersive**, cette plateforme vous permet de créer vos palettes sur-mesure, de passer commande, de consulter vos créations… le tout avec une interface élégante, responsive et colorée.

## Technologies utilisées

- **Next.js** (React framework)
- **Redux Toolkit** pour la gestion d’état
- **React Hot Toast** pour les notifications
- **CSS Modules** pour le style
- **React Transition Group** pour les animations de modales
- **Lottie** pour les loaders animés
- Déployé sur [Vercel](https://vercel.com)

## Pages principales

| Page            | Description |
|-----------------|-------------|
| `/`             | Accueil + Slider des produits |
| `/crayon`       | Personnalisation des crayons |
| `/peinture`     | Palette de couleurs personnalisée |
| `/aerosol`      | Spray design personnalisé |
| `/marqueur`     | Marqueurs colorés |
| `/meilleuresventes` | Palettes populaires prêtes à commander |
| `/compte`       | Profil utilisateur (infos, commandes, palettes) |
| `/panier`       | Panier de commandes |
| `/connexion` / `/inscription` | Authentification |

## Installation locale

1. Clone ce repo :

bash
git clone https://github.com/MathildePestie/lafabrique-frontend.git
cd lafabrique-frontend

2. Installe les dépendances :

yarn install

3. Lance le projet :

yarn dev

Le site est disponible sur : http://localhost:3000

### Connexion avec le backend

Le frontend communique avec une API Express située ici : lafabrique-backend

Le token utilisateur est stocké dans localStorage et utilisé pour :

Authentifier les requêtes

Enregistrer les palettes

Passer des commandes

Mettre à jour les informations personnelles

### Notes de la créatrice

Ce projet a été conçu dans le cadre de mon portfolio personnel.
Il reflète ma passion pour :

Le design UI/UX

La gestion d’état claire (merci Redux !)

Et la magie des interactions fluides

Chaque ligne de code est le fruit d’un apprentissage, de persévérance, et de beaucoup de pigment(s) coloré(s)

### À venir

Paiement sécurisé (Stripe ou autre)

Fonction de recherche produit

### Licence

MIT — Libre d’utilisation et de contribution.


