const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const Independent_Contractor_AgreementSchema = new Schema({
    contractoraddress: String,
    contractorname: String,
    enddate: String,
    otherconfinfo: String,
    companyname: String,
    contractordeliverables: String,
    agreementdate: String,
    entitytype: String,
    startdate: String,
    feeamount: String,
    validated: { type: Boolean, default: false },
    pending: { type: Boolean, default: true },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    recipients: [RecipientSchema],
});

mongoose.model('Independent_Contractor_Agreements', Independent_Contractor_AgreementSchema);