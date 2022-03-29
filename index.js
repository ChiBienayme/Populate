const express = require("express");
const mongoose = require("mongoose");
const app = express();
// Models
const Student = require("./models/studentModel");
const Address = require("./models/addressModel");

// Middlewares
app.use(express.json());

// Connexion à MongoDB
mongoose
  .connect(
    "mongodb+srv://chibienayme:UCPC3bbpkpuoROqt@cluster0.pg9q2.mongodb.net/populate?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  });

// Routes
// Homepage
app.get("/", (_req, res) => {
  res.send("Populate page");
});

//   Find student by ID
app.get("/students/:studentId", async (req, res) => {
  const student = await Student.findById(req.params.studentId).populate(
    "address"
  );

  res.json(student);
});

// Add a student: firstName, surname, address
app.post("/students", async (req, res) => {
  await Student.create(req.body);

  res.status(201).send("Student is created");
});

// Add address by Student ID: streetName, streetNumber, postCode, city
app.post("/students/:studentId/addresses", async (req, res) => {
  const address = await Address.create(req.body);
  await Student.findByIdAndUpdate(req.params.studentId, {
    $push: { addresses: address._id },
  });

  res.status(201).send("Address created");
});

// Start server
app.listen(8001, () => {
  console.log("Listening");
});

// Aggrégation
// join (récupérer des données de deux collections)
// count, group by, avg, max, ascendent, croissant (aggrégation)
