const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');
const SenderSchema = require('./Sender');

const Application_for_EmploymentSchema = new Schema({
        number: String,
        numberdays: String,
        history: String,
        personalprofessional: String,
        relatives: String,
        employeename: String,
        noncompete: String,
        validated: { type: Boolean, default: false },
        pending: { type: Boolean, default: true },
        sender: SenderSchema,
        recipients: [RecipientSchema],
    });

mongoose.model('Application_for_Employments', Application_for_EmploymentSchema);