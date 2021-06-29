# kam-ts
Koa Mongo Angular TypeScript, crud api starter for a Company Management Demo project.

The client has been generated with Angular CLI.
 PrimeNg components & Bootstrap have been used to build the UI.

## Requirements

- Node >= 12.4.0
- Mongo >= 3.6

## How to Deploy (2 options)

### 1) Manually
##### Server
- cd src/api/ 
- npm i
- npm run build
- npm start
##### Client
- cd src/ui/ 
- npm i
- npm start

### 2) Docker
- docker-compose up -d

## How to Test ([Jest](https://jestjs.io/en/))
##### Server
 - cd src/api/
 - npm run test
##### Client
 - cd src/ui/
 - npm run test

## Api Documentation

 You can find the documentation for the api if you open the file `docs/api/index.html` to your browser.

 The documentation was powered by [apiDocs](https://api-docs.io/).

 ## Considerations

 1) In this project authentication is implemented without any credentials just to show how guards should be set up.
 2) When the database does not have any entities, default data are automatically generated.
 3) Didn’t use ngrx, akita or another state management library, although we should understand the benefits of reactive state management 
 4) Some important test cases may be missing :)

 ## Issues - Todos
 1) Unit tests for the server startup, that would ensure that the application starts successfully are missing. 
 2) The client app should ensure full functionality with  e2e tests. Protractor is already set from angular cli.

 ## Variables

| NAME          | Default                                         | 
| ------------- |:-----------------------------------------------:| 
| MONGO_URL     | mongodb://127.0.0.1:27017/companyManagementDemo | 
| API_PORT      | 3000                                            |
