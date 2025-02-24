// backend/routes/stats.js
const express = require('express');
const supabase = require('../config/db');
const router = express.Router();

// Get all stats
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('player_stats').select('*');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;