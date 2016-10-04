# Testable Node.js API

This repository demonstrates the usage of an SignIn testable Node.js REST API.

Libraries that this repository uses:

- Express
- Sequelize.js (ORM)
- Passport.js (Authentication / Token JWT)
- Eslint (code patterns)
- Bcrypt (hashing)

## Pre-requisits

- Node.js (>= 4.4)
- SQLite3

## Starting the app

```
npm install
npm start
```

## Testing the app

```
npm test
```

## Building the app

```
npm build
```

## End-points

- GET localhost:3000/users - Return all users
- GET localhost:3000/users/id - Must inform Authentication HEADER with Bearer Token, return user by ID
- POST localhost:3000/users - Create user
- POST localhost:3000/signin
