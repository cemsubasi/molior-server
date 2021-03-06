const passportRoute = require("./routes/passportRoute");
const { INIT_URL, POST_URL, PHOTO_URL } = require("./data.js");
const initRoute = require("./routes/initRoute");
const productRoute = require("./routes/productRoute");
const offerRoute = require('./routes/offerRoute')
const setRoutes = (server) => {
  server.use("/", (req, res, next) => {
    console.log(req.headers.host, req.url);
    next();
  });
  server.use("/", passportRoute);
  server.use(INIT_URL, initRoute);
  server.use(POST_URL, productRoute);
  server.use('/offer', offerRoute);

  server.use((req, res, next) => {
    res.status(403).send("not found!");
  });
};

module.exports = setRoutes;
