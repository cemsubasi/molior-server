const express = require("./initExpress");
const initPassport = require("./initPassport");
const setRoutes = require("./setRoutes");

const server = express();
initPassport(server);
setRoutes(server);
