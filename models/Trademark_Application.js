const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const Trademark_ApplicationSchema = new Schema({
    creatorname: String,
    usematerials: String,
    creatoraffill: String,
    goodservices: String,
    usegeography: String,
    acronym: String,
    targetcustomer: String,
    marksimiliar: String,
    subjectmatter: String,
    markcreatedspell: String,
    markchanges: String,
    tradechannels: String,
    mark: String,
    markmeaning: String,
    markforeign: String,
    markabbr: String,
    usbusiness: String,
    ususe: String,
    firstuse: String,
    validated: { type: Boolean, default: false },
    pending: { type: Boolean, default: true },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    recipients: [RecipientSchema],
    dateSent: Date,
    lastResponded: Date,
});

mongoose.model('Trademark_Applications', Trademark_ApplicationSchema);