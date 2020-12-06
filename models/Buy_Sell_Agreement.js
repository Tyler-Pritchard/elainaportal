const mongoose = require('mongoose');
const { Schema } = mongoose;

const Buy_Sell_AgreementSchema = new Schema({
    parvalue: String,
    spouseinterest: String,
    companyname: String,
    insuranceaddress: String,
    insurancecomp: String,
    scorp: String,
    installment: String,
    divorce: String,
    companyshares: String,
    interest: String,
    spouseinstallments: String
});

mongoose.model('Buy_Sell_Agreements', Buy_Sell_AgreementSchema);