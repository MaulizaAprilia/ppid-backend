const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    category: String,
    subject: String,
    description: String,
    purpose: String,
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Request', requestSchema);
