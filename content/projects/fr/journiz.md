---
slug: journiz
locale: fr
createdAt: 2024-04-09
updatedAt: 2025-02-22
status: published
name: Journiz
baseline: Réinventer les sorties scolaires
links:
  - title: Code source
    url: https://github.com/Journiz
    newTab: true
thumbnail: /img/projects/journiz.webp

---

::project-description
---
skillsTitle: Sur ce projet
skills:
    - Conception & UX
    - ---
    - Développement mobile
    - Développement Web
    - Backend
    - Ops
    - ---
    - Production vidéo
    - Montage
---

Journiz était le projet de fin d'études lors de mon master aux [Gobelins](https://www.gobelins.fr/). L'objectif était de fournir aux enseignants au lycée un outil intuitif pour créer des activités sous forme de jeux de piste pendant les voyages et sorties scolaires.

Journiz est divisé en deux parties : tout d'abord, l'enseignant construit son jeu à l'aide du back-office. Ensuite, le jour du voyage, les élèves peuvent jouer à son jeu à l'aide de l'application mobile. L'objectif est de leur faire explorer le lieu du voyage en se rendant à plusieurs points d'intérêt.

Concevoir pour deux cibles distinctes
-------------------------------------

Journiz doit être conçu pour cibler deux types de personnes :

- Les enseignants, qui vont utiliser le back-office pour construire leur jeu, et l'application pour le piloter le jour du voyage
- Les élèves, qui utiliseront l'application pour jouer.


Le défi consistait à créer une expérience facile et rassurante pour l'enseignant, tout en étant amusante et attrayante pour les élèves.

Créer deux applications en même temps
-------------------------------------

Nous savions dès le départ que l'ampleur du projet serait considérable compte tenu du temps dont nous disposions. Nous n'avions que trois mois pour construire un back-office complet, une application mobile contenant presque deux applications (sections élèves + enseignants), et le backend en temps réel pour orchestrer le tout.

Ces contraintes nous ont conduit aux choix technologiques suivants.

Choix techniques
----------------

### Back-end

Étant donné le court laps de temps dont nous disposions, nous avons choisi une solution qui prendrait en charge toutes les tâches de base pour nous. Après quelques tests, nous avons opté pour [Pocketbase](https://pocketbase.io/) qui a répondu à toutes nos attentes. Travailler avec a été un jeu d'enfant, et en prime, les mises à jour en temps réel sont gérées nativement ! (Au passage, je recommande fortement de [suivre le projet](https://github.com/pocketbase/pocketbase), il a déjà énormément évolué depuis qu'on l'a utilisé).

### Application mobile et back office

Nous avons testé presque toutes les solutions à disposition : Développement natif, React Native, NativeScript, Capacitor, Flutter. Notre choix final s'est porté sur Capacitor, car il nous permettait de mutualiser le code de l'interface utilisateur avec le back office, tout en nous donnant un accès complet aux plateformes natives (nous avions besoin de cet accès pour gérer les notifications push et les mises à jour de géolocalisation en arrière-plan). La webview tourne sur [Vue.js](https://www.vuejs.org/), tout comme le back-office.
::

::project-video
---
title: Watch the teaser
embed: https://www.youtube.com/embed/e0KKXw5cIjg
---
I was in charge of the video production. I had to figure out how to make the ideas we wrote in the storyboard come to life. This implied finding teenagers that could play, planning a drone shot inside a town, framing, editing and a bit of compositing for "AR" effects.
::

::project-images
---
images:
    - /img/projects/Journiz_1_min.png
    - /img/projects/Journiz_2_min.png
    - /img/projects/Journiz_3_min.webp
    - /img/projects/Journiz_4_min.png
---
::
