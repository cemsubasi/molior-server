const express = require("express");
const http = require('http')
// const https = require('https')
const bodyParser = require("body-parser");
// const fs = require('fs')
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require('cors')
const mongoose = require("mongoose");
const { DB_URL, HTTPPORT, HTTPSPORT } = require("./data.js");

mongoose
  .connect(process.env.MONGODB_URI || DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to mongo"))
  .catch((err) => console.log(err));

// const options = {
// 	    key: fs.readFileSync('./ssl/private.key.pem'),
// 	    cert: fs.readFileSync('./ssl/domain.cert.pem'),
// };


const initExpress = () => {
  const server = express();

  server.use(express.json({ limit: "50mb" }));
  server.use(bodyParser.json());
  server.use(cookieParser());
	server.use(cors());
  server.use(
    session({
      secret: "clyde",
      resave: true,
      saveUninitialized: true,
    })
  );

	http.createServer(server).listen(process.env.PORT || HTTPPORT);
	// https.createServer({options}, server).listen(process.env.PORT || HTTPSPORT);
  return server;
};
module.exports = initExpress;
