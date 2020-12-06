const mongoose = require('mongoose');
const { Schema } = mongoose;

const Application_for_EmploymentSchema = new Schema({
        number: String,
        numberdays: String,
        history: String,
        personalprofessional: String,
        relatives: String,
        employeename: String,
        noncompete: String
    });

mongoose.model('Application_for_Employments', Application_for_EmploymentSchema);