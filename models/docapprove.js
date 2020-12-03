//ALL OF THIS BUILT BY PREVIOUS DEV(S) AND APPLIES TO HTML/JS MVP

const mongoose = require("mongoose");
//press approve in mvp portat, sets category in mongo as approved.  Fromt there another js function
const docapproveSchema = mongoose.Schema({
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

module.exports = mongoose.model("DocApprove", docapproveSchema);
