const mongoose = require('mongoose');
const { Schema } = mongoose;

const Equal_Opportunity_Employment_PolicySchema = new Schema({
    employername: String,
    accommadation: String,
    complaints: String,
    complainttwo: String,
});

mongoose.model('Equal_Opportunity_Employment_Policys', Equal_Opportunity_Employment_PolicySchema);