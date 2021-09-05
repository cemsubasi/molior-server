const passportRoute = require("./routes/passportRoute");
const { INIT_URL, PRODUCTION_URL, ORDER_URL } = require("./config");
const initRoute = require("./routes/initRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");
const setRoutes = (server) => {
	server.use("/", (req, res, next) => {
		console.log(req.url, "req.body:", req.body);
		next();
	});
	server.use("/", passportRoute);
	server.use(INIT_URL, initRoute);
	server.use(PRODUCTION_URL, productRoute);
	server.use(ORDER_URL, orderRoute);

	server.use((req, res, next) => {
		res.status(403).send("not found!");
	});
};

module.exports = setRoutes;
