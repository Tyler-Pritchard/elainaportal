const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

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
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    recipients: [RecipientSchema],
    dateSent: Date,
    lastResponded: Date,
});

mongoose.model('Operating_Agreements', Operating_AgreementSchema);