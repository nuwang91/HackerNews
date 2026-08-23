# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

NasHacker is an Angular 11 single-page app that renders Hacker News stories (top/new/best) using the public [Hacker News Firebase API](https://github.com/HackerNews/API). It was generated with Angular CLI 11.2.11 and is intended as a mobile-viewport demo (layout is not built for desktop).

## Commands

- `npm install` — install dependencies
- `npm run start` (or `ng serve`) — dev server at `http://localhost:4200/`, live reload
- `npm run build` (or `ng build`) — production build to `dist/nas-hacker`; use `ng build --prod` for the optimized/hashed production config (see `angular.json` `production` configuration)
- `npm run lint` (or `ng lint`) — TSLint across `tsconfig.app.json`, `tsconfig.spec.json`, `e2e/tsconfig.json`
- `npm run test-unit` (or `jest`) — Jest unit tests (primary test runner)
- `npm run test:watch` — Jest in watch mode
- `npm test` (or `ng test`) — Karma/Jasmine unit tests (legacy Angular CLI test setup; the project has migrated test authoring to Jest via `jest-preset-angular`, so prefer `test-unit`)
- `npm run e2e` (or `ng e2e`) — Protractor end-to-end tests
- Run a single Jest test file: `npx jest path/to/file.spec.ts`
- Scaffold new pieces with the Angular CLI, e.g. `ng generate component component-name` (also `directive|pipe|service|class|guard|interface|enum|module`)

## Architecture

**Module tree**: `AppModule` → `ShellModule` → `NewsModule` (page) + `NavItemModule`/`ButtonModule` (shared UI). `NewsModule` in turn imports `CardModule`. Each feature/UI component is its own Angular module under `src/app/shell/ui-components/*` (button, card, nav-item) and is declared/exported individually — follow this pattern when adding new presentational components.

**Routing**: Single route family defined in `src/app/app-routing.module.ts`: `news/:type` renders `NewsComponent`, where `:type` is `new`, `best`, or anything else (defaults to top stories). Root and unknown paths redirect to `/news/`.

**Data flow**:
- `DataProviderService` (`src/app/services/data-provider.service.ts`) is a thin wrapper around `HttpClient` that hits `${environment.API_URL}/<url>.json<params>` — all Firebase-backed HN API calls go through this one service.
- `NewsComponent` (`src/app/shell/page/news/news.component.ts`) fetches a list of story IDs for the current type (`topstories`/`newstories`/`beststories`) with a `limitToFirst` query param, then issues a `forkJoin` of per-item `item/<id>` requests to hydrate full story objects. "Load more" doubles the `_top` limit and re-fetches rather than paginating incrementally.
- `NewsService` (`src/app/services/news.service.ts`) is a small cross-component signaling bus (RxJS `Subject`/`BehaviorSubject`) used to trigger "load more" from `ShellComponent` and to broadcast a global `loading$` state consumed by the shell overlay — it holds no story data itself.
- `ShellComponent` also derives nav active-state (`new`/`best`) from `Router` `ActivationEnd` events and drives a loading overlay by combining router navigation events with `ApplicationRef.isStable`.

**Environment config**: `API_URL` and `production` flag live in `src/environments/environment.ts` (dev) and `environment.prod.ts` (prod, swapped in via `fileReplacements` in `angular.json` during `ng build --prod`).

**Time formatting**: Relative timestamps use `javascript-time-ago` with the `en` locale registered once in `NewsComponent`'s constructor.

## Conventions

- Strict TypeScript is enabled (`strict`, `strictTemplates`, `strictInjectionParameters`, `strictInputAccessModifiers` in `tsconfig.json`) — keep new code compliant.
- Injected services use leading-underscore private field names (e.g. `private _dataProviderService`); RxJS `Observable` fields that back a `Subject`/`BehaviorSubject` follow the `_source$` (private) / `source$` (public) naming pattern.
- Component styles use SCSS (default schematic in `angular.json`); single quotes in TypeScript (`.editorconfig`).
- Always unsubscribe manually from long-lived subscriptions in `ngOnDestroy` (see `NewsComponent`, `ShellComponent`) — this codebase does not use the `async` pipe or `takeUntil` consistently, so follow the existing manual-unsubscribe pattern for new subscriptions in these components.
