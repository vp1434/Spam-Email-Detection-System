const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Email = require('../models/Email');
const axios = require('axios');

// @route   POST api/emails/analyze
// @desc    Analyze email (Public)
// @access  Public
router.post('/analyze', async (req, res) => {
  try {
    const { subject, body } = req.body;

    // Call ML Service
    let classification = { isSpam: false, confidence: 0.0 };
    try {
      const mlResponse = await axios.post('http://localhost:5001/predict', {
        text: `${subject} ${body}`
      });
      classification = mlResponse.data;
    } catch (err) {
      console.error('ML Service Error:', err.message);
      return res.status(503).json({ msg: 'ML Service Unavailable' });
    }

    res.json(classification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/emails/upload
// @desc    Upload email and classify
// @access  Private
router.post('/upload', auth, async (req, res) => {
  try {
    const { sender, subject, body } = req.body;

    // Call ML Service
    let classification = { isSpam: false, confidence: 0.0 };
    try {
      const mlResponse = await axios.post('http://localhost:5001/predict', {
        text: `${subject} ${body}`
      });
      classification = mlResponse.data;
    } catch (err) {
      console.error('ML Service Error:', err.message);
      // Fallback or error handling
    }

    const newEmail = new Email({
      userId: req.user.id,
      sender,
      subject,
      body,
      classification
    });

    const email = await newEmail.save();
    res.json(email);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/emails
// @desc    Get all emails for user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const emails = await Email.find({ userId: req.user.id }).sort({ receivedAt: -1 });
    res.json(emails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
