const express = require("express");
const router = express.Router();
const files = require("../models/files");
const upload = require("../multer");

router.route("/").post(upload.single("file"), (req, res) => {
	const Files = new files({
		files: req.body,
	})
		.save()
		.then((result) => {
			console.log("new files added 2 db", req.body);
			res.status(200).send("ok");
		})
		.catch((err) => {
			console.log("db file save err: " + err);
			res.status(400).send("db file save err: " + err);
		});
});

module.exports = router;
