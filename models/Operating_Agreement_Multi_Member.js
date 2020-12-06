const mongoose = require('mongoose');
const { Schema } = mongoose;

const Operating_Agreement_Multi_MemberSchema = new Schema({
    membernames: String,
    minimumnoticean: String,
    loanlimit: String,
    lawsuitlimit: String,
    aoo: String,
    advancenotice: String,
    address: String,
    transactionlimit: String,
    transaction: String,
    companyname: String,
    action: String,
    management: String,
    vote: String,
    memberschedule: String,
    memberinterest: String,
    quorum: String,
    removal: String,
    elect: String,
    transfers: String,
    tax: String,
    taxremoval: String,
    taxauthority: String,
    taxapproval: String,
    dissolution: String,
    managername: String,
    articlesofincorporationdate: String,
    city: String,
    county: String,
    address: String,
    fax: String,
    email: String,
    title: String,
    manager: String,
    managerfax: String,
    manageremail: String,
    modification: String
});

mongoose.model('Operating_Agreement_Multi_Members', Operating_Agreement_Multi_MemberSchema);