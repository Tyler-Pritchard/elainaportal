const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const Family_Medical_Leave_PolicySchema = new Schema({
    contact: String,
    changeposition: String,
    paymentmethod: String,
    formsdepartment: String,
    statuscontact: String,
    permitrequired: String,
    transactionlimit: String,
    employername: String,
    validated: { type: Boolean, default: false },
    pending: { type: Boolean, default: true },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    recipients: [RecipientSchema],
});

mongoose.model('Family_Medical_Leave_Policys', Family_Medical_Leave_PolicySchema);