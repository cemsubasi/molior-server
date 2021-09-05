const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");

const { DB_CONNECT, HTTPPORT, SESSION_OPT, CORS_OPT } = require("./config");

const initExpress = () => {
	const server = express();

	server.use(express.json({ limit: "50mb" }));
	server.use(bodyParser.json());
	server.use(cookieParser());
	server.use(cors(CORS_OPT));
	server.use(session(SESSION_OPT));

	server.listen(HTTPPORT, DB_CONNECT);

	return server;
};
module.exports = initExpress;
