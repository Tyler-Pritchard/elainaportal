const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
    email: String,
    docUrl: String,
});

module.exports = recipientSchema;