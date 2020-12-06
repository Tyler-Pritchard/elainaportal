const mongoose = require('mongoose');
const { Schema } = mongoose;

const Employee_Confidentiality_and_Proprietary_Rights_AgreementSchema = new Schema({
    employername: String,
    employerstate: String,
    employerentity: String,
    employersubsidiaries: String,                
    employeeName: String,           
    consideration: String,           
    shareconfidential: String,           
    officerName: String,
    officerTitle: String
});

mongoose.model('Employee_Confidentiality_and_Proprietary_Rights_Agreements', Employee_Confidentiality_and_Proprietary_Rights_AgreementSchema);