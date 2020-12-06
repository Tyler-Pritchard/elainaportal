const mongoose = require('mongoose');
const { Schema } = mongoose;

const Operating_AgreementSchema = new Schema({
    username: String,
    titleatcompany: String,
    mailingaddress: String,
    companyname: String, permitrequired: String,
    employername: String,
    contact: String,
    changeposition: String,
    paymentmethod: String,
    formsdepartment: String,
    statuscontact: String,
    companyaddress: String,
});

mongoose.model('Operating_Agreements', Operating_AgreementSchema);