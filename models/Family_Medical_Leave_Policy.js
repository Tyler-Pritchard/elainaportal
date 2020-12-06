const mongoose = require('mongoose');
const { Schema } = mongoose;

const Family_Medical_Leave_PolicySchema = new Schema({
    contact: String,
    changeposition: String,
    paymentmethod: String,
    formsdepartment: String,
    statuscontact: String,
    permitrequired: String,
    transactionlimit: String,
    employername: String
});

mongoose.model('Family_Medical_Leave_Policys', Family_Medical_Leave_PolicySchema);