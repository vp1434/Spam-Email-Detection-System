const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sender: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  classification: {
    isSpam: { type: Boolean, required: true },
    confidence: { type: Number, required: true }
  },
  receivedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Email', emailSchema);
