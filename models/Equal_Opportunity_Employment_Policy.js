const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const Equal_Opportunity_Employment_PolicySchema = new Schema({
    employername: String,
    accommadation: String,
    complaints: String,
    complainttwo: String,
    validated: { type: Boolean, default: false },
    pending: { type: Boolean, default: true },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    recipients: [RecipientSchema],
    dateSent: Date,
    lastResponded: Date,
});

mongoose.model('Equal_Opportunity_Employment_Policys', Equal_Opportunity_Employment_PolicySchema);