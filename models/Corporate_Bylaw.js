const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const Corporate_BylawSchema = new Schema({
    board: String,
    voting: String,
    meetings: String,
    quorum: String,
    remove: String,
    compensation: String,
    address: String,
    vacancy: String,
    corporatename: String,
    validated: { type: Boolean, default: false },
    pending: { type: Boolean, default: true },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    recipients: [RecipientSchema],
    dateSent: Date,
    lastResponded: Date,
});

mongoose.model('Corporate_Bylaws', Corporate_BylawSchema);