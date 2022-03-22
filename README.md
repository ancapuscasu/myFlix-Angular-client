MyFlixAngularClient is a dynamic web application that allows movie enthusiasts to explore movies. It uses the [myFlix API](https://github.com/ancapuscasu/myFlix) and is built using Angular. The project was generated with the [Angular CLI](https://github.com/angular/angular-cli) version 13.2.6 and is written in TypeScript.

## Live website

Visit myFlixAngularClient [here](https://ancapuscasu.github.io/myFlix-Angular-client/welcome) and sign up to explore the app!

## Key Features

- A welcome page invites users to log in or register for the app. 
- A successful login or registration takes users to the main view where all the movies from the database connected to the API are displayed. Movies are presented as cards that show the movie title, director and image from IMDb.
- Buttons on the cards allow users to explore further details. By clicking on synopsis, director or genre a dialog pops up to display additional details. 
- Users can create a collection of favourite movies that they can navigate to from the navigation bar under Profile. Movies are added to or removed from favourites by clicking on a heart icon displayed on each card. 
- Users can navigate to their account from the navigation bar under Profile. This view is where users can edit their user details or deregister from the application.
- The application uses Angular Material to provide UI components including the the cards, buttons, inputs, icons, dialogs, and snackbars.
- myFlixAngularClient interacts with the movies, genres and users databases using the myFlix API. Requests to the API are made using a service module injected into the root component that is configured using Angular's HttpClient class.
- The completed app has been published to github pages and is accessible via the live website link above.

## Technologies
- Angular
- Angular Material

## Installation and set up
This project requires npm in order to install package dependencies. npm is installed automatically when installing node.js. The relevant documentation can be found [here](https://nodejs.org/en/).
Once npm is installed, install the project dependencies by running: 
```
npm install
```
Next you need to install the Angular CLI:
```
npm install -g @angular/cli
```
You will now be able to run CLI commands inside the project. To start the project locally using a dev server run:
```
ng serve 
```
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.