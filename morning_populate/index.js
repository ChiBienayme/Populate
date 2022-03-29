const express = require("express");
const mongoose = require("mongoose");
const app = express();
// Models
const Student = require("../models/studentModel");
const Address = require("./models/addressModel");

// Middlewares
app.use(express.json());

// Connexion à MongoDB
mongoose
	.connect(
		"mongodb+srv://chibienayme:UCPC3bbpkpuoROqt@cluster0.pg9q2.mongodb.net/login?retryWrites=true&w=majority",
		{
			useNewUrlParser: true,
		}
	)
	.then(() => {
		console.log("Connected to MongoDB");
	});

// Routes
app.get("/students/:studentid", async (req, res) => {
	const Student = await Student.findById(req.params.studentid).populate("address");

	res.json(Student);
});

app.post("/students", async (req, res) => {
	await Student.create(req.body);

	res.status(201).send("Student created");
});

app.post("/students/:studentid/address", async (req, res) => {
	const address = await Address.create(req.body);
	await Student.findByIdAndUpdate(req.params.studentid, {
		$push: { address: address._id },
	});

	res.status(201).send("post created");
});

app.get("/stats", async (req, res) => {
	const data = await Student.aggregate([
		{
			$match: {
				age: { $gte: 20 },
			},
		},
		{
			$group: {
				_id: null,
				ageAverage: { $avg: "$age" },
				min: { $min: "$age" },
				max: { $max: "$age" },
			},
		},
	]);

	res.json(data);
});

// Start server
app.listen(8001, () => {
	console.log("Listening");
});

// Aggrégation
// join (récupérer des données de deux collections)
// count, group by, avg, max, ascendent, croissant (aggrégation)