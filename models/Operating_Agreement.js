const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');
const SenderSchema = require('./Sender');

const Operating_AgreementSchema = new Schema({
    username: String,
    titleatcompany: String,
    mailingaddress: String,
    companyname: String, permitrequired: String,
    employername: String,
    contact: String,
    changeposition: String,
    paymentmethod: String,
    formsdepartment: String,
    statuscontact: String,
    companyaddress: String,
    validated: { type: Boolean, default: false },
    pending: { type: Boolean, default: true },
    sender: SenderSchema,
    recipients: [RecipientSchema],
});

mongoose.model('Operating_Agreements', Operating_AgreementSchema);