const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

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
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    recipients: [RecipientSchema],
});

mongoose.model('Employee_Confidentiality_and_Proprietary_Rights_Agreements', Employee_Confidentiality_and_Proprietary_Rights_AgreementSchema);