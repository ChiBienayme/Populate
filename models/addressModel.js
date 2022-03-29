const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
	id: ObjectId,
	streetName: String,
	streetNumber: String,
	postCode: String,
	city: String,
	
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;