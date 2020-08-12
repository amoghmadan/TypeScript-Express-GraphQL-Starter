# TypeScript-Express-GraphQL-Starter
Kick-starter to your GraphQL application.

## Setup
    npm i

## How to run?
    Development: npm run serve
    Build: npm run build
    Production: npm start

## Project Structure
    .
    ├── LICENSE
    ├── package.json
    ├── package-lock.json
    ├── README.md
    ├── resources
    │   ├── development.json
    │   └── production.json
    ├── src
    │   ├── App.ts
    │   ├── index.ts
    │   ├── interfaces
    │   │   └── person.ts
    │   ├── models
    │   │   └── person.ts
    │   └── schema
    │       ├── index.ts
    │       ├── resolvers
    │       │   ├── index.ts
    │       │   ├── mutations.ts
    │       │   └── queries.ts
    │       └── typeDefs.ts
    └── tsconfig.json

## Deploy
    npm i -g pm2
    pm2 --name <app_name_here> start npm -- start --watch-delay <seconds_here>

## Check Application Status
    pm2 ps
