const express = require("express");
const fs = require('fs');
const path = require("path");
const bodyParser = require("body-parser");

let server = express();
server.use(express.json());
server.use(bodyParser.json());

// establish public path
server.use(express.static(path.join(__dirname, "public")));

server.use('/', require('./api'));

// start server
const PORT = process.env.PORT || 8001;
server.listen(PORT, console.log(`Server started at http://localhost:${PORT}/ ...`));
