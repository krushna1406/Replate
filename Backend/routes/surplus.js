const express = require('express');
const router = express.Router();
const Surplus = require('../models/Surplus');

// Create new surplus listing
router.post('/create', async (req, res) => {
  try {
    const surplus = await Surplus.create(req.body);
    res.status(201).json({ message: 'Surplus listing created', surplus });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all surplus listings
router.get('/all', async (req, res) => {
  try {
    const list = await Surplus.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
