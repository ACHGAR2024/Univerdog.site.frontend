<p align="center">
  <a href="https://univerdog.site" target="_blank">
    <img src="https://univerdog.site/src/images/logo.png" width="150" alt="UniversDog Logo">
  </a>
</p>

<h1 align="center">🐾 UniversDog - Frontend</h1>

<p align="center">
  <strong>Une application React moderne pour les amoureux des chiens</strong>
</p>

<p align="center">
  <a href="#-à-propos">À propos</a> •
  <a href="#-fonctionnalités">Fonctionnalités</a> •
  <a href="#-technologies">Technologies</a> •
  <a href="#-démarrage-rapide">Démarrage rapide</a> •
  <a href="#-structure-du-projet">Structure du projet</a> •
  <a href="#-contribution">Contribution</a> •
  <a href="#-licence">Licence</a>
</p>

## 📘 À propos

UniversDog est une application web moderne conçue pour les propriétaires de chiens et les amoureux des animaux. Notre plateforme offre une expérience utilisateur fluide pour découvrir des événements canins, réserver des places, et explorer des lieux adaptés aux chiens à Lyon.

## 🌟 Fonctionnalités

- 🔒 **Authentification JWT** : Utilisation de tokens JWT pour l'authentification sécurisée via le protocole Bearer.
- 🔐 **Connexion sécurisée avec Google** : Utilisez Google pour vous connecter de manière sécurisée.
- 🎉 **Gestion d'événements** : Parcourez et gérez une liste d'événements canins.
- 🎟️ **Système de réservation** : Réservez des places pour les événements.
- 🗺️ **Exploration de lieux** : Découvrez des endroits adaptés aux chiens.
- 🔍 **Recherche avancée** : Trouvez facilement des lieux et des événements.
- 📝 **Inscription simplifiée** : Rejoignez notre communauté en quelques clics.
- 📱 **Responsive Design** : Profitez d'une expérience utilisateur optimale sur tous les appareils.
- 📦 **QR Code** : Utilisation de QR codes pour une expérience utilisateur plus fluide.
- 🚀 **Dashboard Utilisateur** : Un tableau de bord dédié aux utilisateurs pour gérer leurs informations et leurs activités.
- 🚀 **Dashboard Professionnel** : Un tableau de bord pour les professionnels pour gérer leurs services et leurs réservations.
- 🚀 **Dashboard Administrateur** : Un tableau de bord pour les administrateurs pour gérer l'ensemble de la plateforme.
- 🗺️ **Carte Interactive avec Maps** : Utilisation de cartes interactives pour montrer les emplacements et les distances.
- 🚗 **Calcul de Distance** : Calcul de la distance entre les emplacements pour aider les utilisateurs à planifier leurs déplacements.
- 🔍 **Recherche de Lieu Professionnel Simplifiée** : Recherche simplifiée pour trouver des lieux professionnels adaptés aux chiens.
- 🛍️ **Produits Phares avec Liens d'Affiliation** : Présentation de produits phares avec des liens d'affiliation pour les utilisateurs intéressés.
- 🤖 **Conseils avec IA** : Posez votre question à notre IA spécialisée pour obtenir des conseils sur les soins et l'éducation des chiens.
- 🚧 **Aide Administrative** : Outils d'aide administrative pour faciliter la gestion de la plateforme.
- 🚗 **Gestion des Voyages et Excursions avec Chien** : Planification et gestion des voyages et excursions avec des chiens.
- 📱 **Version Mobile React Native Android APK Téléchargeable** : Version mobile de l'application disponible sur Android via un APK téléchargeable.

## 🛠 Technologies

- **React 18** - Bibliothèque UI moderne et réactive
- **Vite** - Build tool ultra-rapide pour le développement
- **Tailwind CSS** - Framework CSS utilitaire pour un design personnalisé
- **ESLint** - Linter pour maintenir un code propre et cohérent

## 🚀 Démarrage rapide

1. **Clonez le dépôt**

   ```bash
   git clone https://github.com/ACHGAR2024/Univerdog.site.frontend.git
   cd univerdog-frontend
   ```

2. **Installez les dépendances**

   ```bash
   npm install
   ```

3. **Lancez le serveur de développement**

   ```bash
   npm run dev -- --host=localhost --port=5173
   ```

4. **Ouvrez votre navigateur** et accédez à `http://localhost:5173`

## 📁 Structure du projet

```
src/
├── pages/
│   └── public/
│       ├── HomeContent.jsx
│       ├── About.jsx
│       ├── Contact.jsx
│       ├── CGPVfile.jsx
│       ├── CookiePreferences.jsx
│       ├── MentionsLegales.jsx
│       ├── Privacy.jsx
│       └── Terms.jsx
├── context/
│   ├── AuthContext.jsx
│   ├── DarkModeContext.jsx
│   ├── SectionContext.jsx
│   └── UserContext.jsx
├── config/
│   └── axiosConfig.js
├── components/
│   ├── auth/
│   │   ├── Login.jsx
│   │   ├── GoogleLoginComponent.jsx
│   │   ├── Logout.jsx
│   │   ├── PrivateRoute.jsx
│   │   ├── ProProfileUpdate.jsx
│   │   ├── UserProfileUpdate.jsx
│   │   ├── UtilisateursAdmin.jsx
│   │   └── Register.jsx
│   ├── nav_footer/
│   │   ├── Footer.jsx
│   │   ├── Nav.jsx
│   └── dashboard_comp/
│       ├── pagesuser/
│       ├── pagespro/
│       └── pagesadmin/
│  Home.jsx
│  index.css

```

## 🤝 Contribution

Nous accueillons chaleureusement les contributions ! Si vous souhaitez contribuer :

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.

---

<p align="center">
  Fait avec ❤️ par l'équipe UniversDog
  <br>
  <a href="https://univerdog.site">www.univerdog.site</a>
</p>
