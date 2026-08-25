# NasHacker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.11 and has since been upgraded through to Angular 22.

This is a pet project done to demonstrate the use hacker news API along with Angular Framework as frontend.
The code base only covered a scenario where news were read from a mobile device.

Hacker News API - https://github.com/HackerNews/API

Stackblitz - https://stackblitz.com/github/nuwang91/HackerNews

## Live Deployment

The app is deployed and available at https://hackernews-pjky.onrender.com/

## Prerequisites

- Node (`^22.22.3 || ^24.15.0 || ^26.0.0`, per Angular 22's requirements)
- NPM

## Development server

Run `npm install` and include the dependencies.

Run `ng serve` or `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. This produces a development build by default; use `ng build --configuration production` for a production build (the old `--prod` flag has been removed from the Angular CLI). Build artifacts are stored in `dist/nas-hacker/browser`.

## Running Locally with Docker

Run `docker build -t nas-hacker .` to build the Docker image.

Run `docker run -p 8080:80 nas-hacker` to start the container, then open `http://localhost:8080`.

## Running unit tests

Run `npm run test-unit` to execute the unit tests via [Jest](https://jestjs.io/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
