
//HAVE NOT DETERMINED HOW TO IMPLIMENT ATTORNEY/CLIENT INTERACTIONS YET

const mongoose = require("mongoose");
const { Schema } = mongoose;

const attorneySchema = new Schema({
	user: {
		type: String,
		required: true
	},
	approver: {
		type: String,
		required: true
	},
	link: [{
		url: String,
		status: String,
		date: {
			type: Date,
			default: Date.now()
		}
	}]
});

module.exports = attorneySchema;
