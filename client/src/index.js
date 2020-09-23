const client = require("./client");

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	client.getAll(null, (err, data) => {
		if (!err) {
			res.render("mountains", {
				results: data.mountains
			});
		}
	});
});

app.post("/save", (req, res) => {
	let newMountain = {
		name: req.body.name,
		elevation: req.body.elevation,
		location: req.body.location
	};

	client.insert(newMountain, (err, data) => {
		if (err) throw err;

		console.log("Mountain created successfully", data);
		res.redirect("/");
	});
});

app.post("/update", (req, res) => {
	const updateMountain = {
		id: req.body.id,
		name: req.body.name,
		elevation: req.body.elevation,
		location: req.body.location
	};

	client.update(updateMountain, (err, data) => {
		if (err) throw err;

		console.log("Mountain updated successfully", data);
		res.redirect("/");
	});
});

app.post("/remove", (req, res) => {
	client.remove({ id: req.body.mountain_id }, (err, _) => {
		if (err) throw err;

		console.log("Mountain removed successfully");
		res.redirect("/");
	});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log("Server running at port %d", PORT);
});
