const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const Employee_NonCompete_AgreementSchema = new Schema({
    businesstype: String,
    industrydescr: String,
    employerfirstname: String,
    employerlastname: String,
    businessaddress: String,
    businesscomp: String,
    businessdescr: String,
    jobtitle: String,
    date: String,
    employeefirstname: String,
    employeelastname: String,
    employeeaddress: String,
    duration: String,
    scope: String,
    nonsolicit: String,
    validated: { type: Boolean, default: false },
    pending: { type: Boolean, default: true },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    recipients: [RecipientSchema],
});

mongoose.model('Employee_NonCompete_Agreements', Employee_NonCompete_AgreementSchema);