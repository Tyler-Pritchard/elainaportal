const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');
const SenderSchema = require('./Sender');

const Employee_Confidentiality_and_Proprietary_Rights_AgreementSchema = new Schema({
    employername: String,
    employerstate: String,
    employerentity: String,
    employersubsidiaries: String,                
    employeeName: String,           
    consideration: String,           
    shareconfidential: String,           
    officerName: String,
    officerTitle: String,
    validated: { type: Boolean, default: false },
    pending: { type: Boolean, default: true },
    sender: SenderSchema,
    recipients: [RecipientSchema],
});

mongoose.model('Employee_Confidentiality_and_Proprietary_Rights_Agreements', Employee_Confidentiality_and_Proprietary_Rights_AgreementSchema);