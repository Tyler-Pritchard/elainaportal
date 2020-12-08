const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const Dress_Code_PolicySchema = new Schema({
    "image": "String",
    "contact": "String",
    "businesscasual": "String",
    "employeename": "String",
    "clientcustomer": "String",
    validated: { type: Boolean, default: false },
    pending: { type: Boolean, default: true },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    recipients: [RecipientSchema],
    dateSent: Date,
    lastResponded: Date,
});

mongoose.model('Dress_Code_Policys', Dress_Code_PolicySchema);