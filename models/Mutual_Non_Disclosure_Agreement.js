const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');
const SenderSchema = require('./Sender');

const Mutual_Non_Disclosure_AgreementSchema = new Schema({
    partyoneaddress: String,
    partyonestate: String,
    partytwoaddress: String,
    partyonecity: String,
    partytwostate: String,
    partyonecounty: String,
    partyone: String,
    timeperiod: String,
    partyoneentity: String,
    partytwoentity: String,
    purpose: String,
    partytwo: String,
    validated: { type: Boolean, default: false },
    pending: { type: Boolean, default: true },
    sender: SenderSchema,
    recipients: [RecipientSchema],
});

mongoose.model('Mutual_Non_Disclosure_Agreements', Mutual_Non_Disclosure_AgreementSchema);