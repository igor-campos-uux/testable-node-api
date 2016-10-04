"use strict";

let express = require("express");
let db = require("./libs/repositories/db")();
let routes = require("./libs/routes");
let bodyParser = require("body-parser");

const app = express();
let auth = require("./libs/auth")(db);

app.use(bodyParser.json());
app.use(auth.init());
routes(app, db, auth);

db.sequelize.sync().done(() => {
    const port = 3000;
    app.listen(port, () => {
        console.log(`Running ${port}`);
    });
});