const mongoose = require('mongoose');
const { Schema } = mongoose;

const Mutual_Non_Disclosure_AgreementSchema = new Schema({
    partyoneaddress: String,
    partyonestate: String,
    partytwoaddress: String,
    partyonecity: String,
    partytwostate: String,
    partyonecounty: String,
    partyone: String,
    timeperiod: String,
    partyoneentity: String,
    partytwoentity: String,
    purpose: String,
    partytwo: String
});

mongoose.model('Mutual_Non_Disclosure_Agreements', Mutual_Non_Disclosure_AgreementSchema);