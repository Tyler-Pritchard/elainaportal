const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    feeamount: String
});

mongoose.model('Independent_Contractor_Agreements', Independent_Contractor_AgreementSchema);