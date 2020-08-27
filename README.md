# Angular Elements NodeJS Widget Server Starter

![PR validation](https://github.com/rfprod/ng-elements-starter/workflows/PR%20validation/badge.svg)
![Master](https://github.com/rfprod/ng-elements-starter/workflows/Master/badge.svg)

## Description

The project consists of a basic NodeJS server, and Angular client application.

NodeJS provides procedural API (without database), and serves client application static assets.

Client application consists of application core, and feature modules.

Each client application feature module can be built as a standalone widget based on custom elements ([Angular Elements](https://angular.io/guide/elements)).

This widgets can be consumed by an arbitrary website, and can be interacted with using JavaScript API.

## Deployment urls

| Name                                        | Url                                                                                       |
| ------------------------------------------- | ----------------------------------------------------------------------------------------- |
| NgElementsStarter                           | [🔗#1](https://ng2elements.web.app/) [🔗#2](https://ng2elements.web.app/ng-elements-app/) |
| Balance element                             | [🔗#1](https://ng2elements.web.app/ng-elements-balance/)                                  |
| Balance element (widget usage example)      | [🔗#1](https://ng2elements.web.app/ng-elements-balance/usage-example/index.html)          |
| Balance element (widget bootstrap script)   | [🔗#1](https://ng2elements.web.app/ng-elements-balance/bootstrap.js)                      |
| Catalogue element                           | [🔗#1](https://ng2elements.web.app/ng-elements-catalog/)                                  |
| Catalogue element (widget usage example)    | [🔗#1](https://ng2elements.web.app/ng-elements-catalog/usage-example/index.html)          |
| Catalogue element (widget bootstrap script) | [🔗#1](https://ng2elements.web.app/ng-elements-catalog/bootstrap.js)                      |
| Orders element                              | [🔗#1](https://ng2elements.web.app/ng-elements-orders/)                                   |
| Orders element (widget usage example)       | [🔗#1](https://ng2elements.web.app/ng-elements-orders/usage-example/index.html)           |
| Orders element (widget bootstrap script)    | [🔗#1](https://ng2elements.web.app/ng-elements-orders/bootstrap.js)                       |
| Passport element                            | [🔗#1](https://ng2elements.web.app/ng-elements-passport/)                                 |
| Passport element (widget usage example)     | [🔗#1](https://ng2elements.web.app/ng-elements-passport/usage-example/index.html)         |
| Passport element (widget bootstrap script)  | [🔗#1](https://ng2elements.web.app/ng-elements-passport/bootstrap.js)                     |
| Compodoc documentation                      | [🔗#1](https://ng2elements.web.app/documentation/)                                        |
| Coverage report                             | [🔗#1](https://ng2elements.web.app/coverage/)                                             |

## Preferred package manager

- **[Yarn](https://www.npmjs.com/package/yarn)**

## Committing changes to repo

Using commitizen cli is mandatory, [reference](https://github.com/commitizen/cz-cli).

Provided all dependencies were installed, and this requirements are fulfilled [cz-cli#conventional-commit-messages-as-a-global-utility](https://github.com/commitizen/cz-cli#conventional-commit-messages-as-a-global-utility) this command must be used.

```bash
git cz
```

## General project info

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

### Dependencies installation

To install global dependencies use command

```bash
npm run install:global
```

or

```bash
bash shell/install.sh global
```

To install project dependencies use command

```bash
npm run install:project
```

or

```bash
bash shell/install.sh project
```

or do

```bash
cd ./functions
npm i
cd ..
yarn install
```

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

To start the project in development mode use command

```bash
npm start
```

To run a specific client module check `package.json` commands that are prefixed with `serve:`, and `serve:`:

```bash
npm run start:prod
npm run start:server

npm run serve:app
npm run serve:balance
npm run serve:catalog
npm run serve:orders
npm run serve:passport
```

### Production server

Run `npm run server`

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

To build a specific widget check `package.json` commands that are prefixed with `build:`:

```bash
npm run build:all:express
npm run build:all:firebase
npm run build:app:prod
npm run build:app:prod:firebase
npm run build:app:stats
npm run build:balance:prod
npm run build:balance:stats
npm run build:catalog:prod
npm run build:catalog:stats
npm run build:orders:prod
npm run build:orders:stats
npm run build:passport:prod
npm run build:passport:stats
```

### Analyze bundle

To analyze a specific bundle check `package.json` commands that are prefixed with `analyze:`:

```bash
npm run analyze:app
npm run analyze:balance
npm run analyze:catalog
npm run analyze:orders
npm run analyze:passport
```

### Running unit tests

Run `ng test` to execute the unit tests via [Jest](https://jestjs.io/).

For specific testing commands check `package.json`, commands prefixed with `test:`:

```bash
npm run test:single-run
npm run test:single-run:report
npm run test:single-run:report-to-dist
```

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io//).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Documentation

### [Angular](https://angular.io/)

### [Angular Elements](https://angular.io/guide/elements)

### [Angular Material](https://material.angular.io/)

### [Azure DevOps YAML Schema](https://docs.microsoft.com/en-us/azure/devops/pipelines/yaml-schema?view=vsts&tabs=example#trigger)

### [Firebase JS Reference](https://firebase.google.com/docs/reference/js/)
