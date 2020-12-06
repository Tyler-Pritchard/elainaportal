const mongoose = require('mongoose');
const { Schema } = mongoose;

const Corporate_BylawSchema = new Schema({
    board: String,
    voting: String,
    meetings: String,
    quorum: String,
    remove: String,
    compensation: String,
    address: String,
    vacancy: String,
    corporatename: String
});

mongoose.model('Corporate_Bylaws', Corporate_BylawSchema);