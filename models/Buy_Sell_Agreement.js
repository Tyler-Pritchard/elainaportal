const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');
const SenderSchema = require('./Sender');

const Buy_Sell_AgreementSchema = new Schema({
    parvalue: String,
    spouseinterest: String,
    companyname: String,
    insuranceaddress: String,
    insurancecomp: String,
    scorp: String,
    installment: String,
    divorce: String,
    companyshares: String,
    interest: String,
    spouseinstallments: String,
    validated: { type: Boolean, default: false },
    pending: { type: Boolean, default: true },
    sender: SenderSchema,
    recipients: [RecipientSchema],
});

mongoose.model('Buy_Sell_Agreements', Buy_Sell_AgreementSchema);