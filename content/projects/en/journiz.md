---
slug: journiz
locale: en
createdAt: 2024-04-09
updatedAt: 2025-02-22
status: published
name: Journiz
baseline: Reinventing school trips
links:
  - title: See source code
    url: https://github.com/Journiz
    newTab: true
thumbnail: /img/projects/journiz.webp

---

::project-description
---
skillsTitle: On this project
skills:
    - Design Process & UX
    - ---
    - Mobile Developement
    - Web Developement
    - Backend
    - Ops
    - ---
    - Video Production
    - Editing
---

This project was the last school project when I was in  [Gobelins](https://www.gobelins.fr/). The goal was to provide high school teachers with an intuitive tool to create trail-game format activities during school trips.

Journiz is divided into two parts: first, the teacher builds its game using the back office. Then, the day of the trip, the students can play the game he created using the mobile app. The goal is to make them explore the location of the trip by going to several points of interest.

## A two targets design process

Journiz has to be designed to target two types of people:

-   The teachers, who are going to use the back-office to build their game, and the app to drive it the day of the trip
-   The students, who are going to use the app to play.

The challenge was to create an experience that was easy and reassuring for the teacher, while being fun and engaging for the students.

## Building two apps at once

We knew from the start that the span of the project was going to be huge regarding the time we had. We had only three months to build a full-fledged back-office, an mobile app that is almost two apps (student + teacher sections), and the realtime backend to orchestrate the whole thing.

These constraints made drove us to the following tech choices.

## Tech stack

### Back-end

In the short timespan we had, we chose to pick a solution that would handle all the basic stuff for us. After some testing, we went with  [Pocketbase](https://pocketbase.io/)  that met every expectation we had. Working with it was a breeze, and special bonus, it handles realtime updates natively !

### Mobile app & back office

We benchmarked almost every solution we had: Native development, React Native, NativeScript, Capacitor, Flutter. Our final choice was Capacitor, because it allowed us to mutualize UI code with the back office, while giving us full access to the native platforms (we needed this access to handle push notifications and background geolocation updates). The web view is powered by Vue.js, as is the back office.
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
