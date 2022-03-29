const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
	id: ObjectId,
	firstName: String,
	surname: String,
	address: [{ type: mongoose.Types.ObjectId, ref: "Address" }],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;