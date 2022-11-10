## Workflow - CA


### Status test badges
[![Automated E2E Testing](https://github.com/Sigvel/social-media-client/actions/workflows/e2e-testing.yml/badge.svg)](https://github.com/Sigvel/social-media-client/actions/workflows/e2e-testing.yml)

[![Automated Unit Testing](https://github.com/Sigvel/social-media-client/actions/workflows/unit-test.yml/badge.svg)](https://github.com/Sigvel/social-media-client/actions/workflows/unit-test.yml)

[![Deploy static content to Pages](https://github.com/Sigvel/social-media-client/actions/workflows/pages.yml/badge.svg)](https://github.com/Sigvel/social-media-client/actions/workflows/pages.yml)
### About

This project is a part of the workflow - Course Assignment from Noroff. The goal of this assignment is 
to improve the quality of an existing environment by establishing useful workflows that make the development process more efficient.
I have configured to have pre-commit checks using Prettier, ESLint and Jest, to ensure code quality is maintained.
I have also established branch protections with github action workflows to automatically check that my unit and end to end tests
are passing before allowed to merge into the branch.

### Getting started

#### Installing

- Above the list of files, click Code.
- Open with Github Desktop or Download ZIP

Then:
- Setup repo in chosen location 
- Open project folder in your code editor.
- Open terminal in code editor, if using external terminal remember to navigate into project folder.

#### Setup

Initialize git in project folder to avoid errors related to husky setup.

```
git init
```

Install dependencies

```
npm i
```

****The project is using sass and bootstrap, The configuration commands in package.json is as follows.****

```
npm run build
```
:point_up: Runs the build process for the project.

```
npm run dev
```
:point_up: Use this command to initialize vite live server

### Implemented tests

#### Unit Tests ( Jest )

Following test files is Added:

- login.test.js
  - Tests successful login
  - Tests unsuccessful login
- create.test.js
  - Tests successful creation of post
  - Tests unsuccessful creation of post
- localstorage.test.js
  - Tests load function gets item token
  - Tests save function sets item token
  - tests logout function

To run jest tests use:
```
npm run test-unit
```

#### EndToEnd Testing ( Cypress )

Following test files is Added:

- login-create.cy.js
  - Tests login with invalid email.
  - Tests login with valid credentials.
  - Tests creation of post with invalid credentials.
  - Tests creation of post with valid credentials.
- logout.cy.js
  - Tests if token is present in localstorage.
  - Tests if logout button, logs out user.
  - Tests if token is not present in localstorage.

before running cypress tests ensure local server is running using
```
npm run dev
```

To run cypress tests use:
```
npm run test-e2e
```
or
```
npm run test-e2e-cli
```

#### Unit Testing Dependency

localStorage mock:

```
npm i -D jest-localstorage-mock
```

Settings in package.json:
```json
  "jest": {
    "resetMocks": false,
    "setupFiles": [
      "jest-localstorage-mock"
    ]
  },
```

### Code Formatters

Installed prettier:
```
npm i -D prettier
```

Installed ESlint:
```
npm i -D eslint
```

****ESlint setup:****

To initialize setup:
```
npx eslint --init
```
The following ESlint setup was used for this project:
```
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No
✔ Where does your code run? · browser
✔ What format do you want your config file to be in? · JSON
```

Installed babel for support of ES6 modules
```
npm -D install @babel/core@7.19.3 @babel/preset-env@7.19.4
```

Created `babel.config.json` and added following:
```js
{
  "presets": [["@babel/preset-env", { "targets": { "node": "current" } }]]
}
```


### Installed dependencies
```
git
Prettier
eslint
husky
Babel
cypress
eslint-plugin-cypress
jest
eslint-plugin-jest
jest-localstorage-mock
babel/core
babel/preset-env
vite
```
##### Scripts added

```json
    "format": "prettier -w src/js/**/*.js",
    "lint": "eslint src/**/*.js",
    "lint-fix": "eslint src/**/*.js --cache --fix",
    "test-unit": "jest",
    "prepare": "husky install",
    "test": "npm run test-unit && npm run test-e2e-cli",
    "test-e2e": "cypress open",
    "test-e2e-cli": "cypress run",
    "dev": "vite",
    "vite-build": "vite build",
    "vite-preview": "vite preview"
```

### ESlint Configuration file added

***eslint.config.json***
```json
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
        {
            "files": ["**/*.test.js"],
            "env": { "jest": true },
            "plugins": ["jest"],
            "extends": ["plugin:jest/recommended"],
            "rules": { "jest/prefer-expect-assertions": "off", "no-unused-vars": "off", "no-undef": "off" }
          },
          {
            "files": ["**/*.cy.js", "cypress.config.js"],
            "env": { "cypress/globals": true },
            "plugins": ["cypress"],
            "extends": ["plugin:cypress/recommended"],
            "rules": {
              "cypress/no-unnecessary-waiting": "off",
              "no-unused-vars": "off",
              "no-undef": "off"
            }
          }
      
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
    }
}
```

#### Vite
Because of high security vulnerabilities related to live-server i switched it
out for vite.

Installed dependency
```
npm i -D vite
```

Added scripts in `package.json` to run the live server

`npm run dev`

***vite.config.json***
```
export default {
  server: {
    port: 8485,
    hot: true,
    host: "127.0.0.1",
  },
};
```

To configure port and host address you can change it in the vite config file shown above.
