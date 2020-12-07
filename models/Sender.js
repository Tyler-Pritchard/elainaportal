const mongoose = require('mongoose');
const { Schema } = mongoose;

const senderSchema = new Schema({
    email: String,
    docUrl: String,
});

module.exports = senderSchema;