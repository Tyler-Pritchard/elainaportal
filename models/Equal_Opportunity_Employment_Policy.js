const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');
const SenderSchema = require('./Sender');

const Equal_Opportunity_Employment_PolicySchema = new Schema({
    employername: String,
    accommadation: String,
    complaints: String,
    complainttwo: String,
    validated: { type: Boolean, default: false },
    pending: { type: Boolean, default: true },
    sender: SenderSchema,
    recipients: [RecipientSchema],
});

mongoose.model('Equal_Opportunity_Employment_Policys', Equal_Opportunity_Employment_PolicySchema);