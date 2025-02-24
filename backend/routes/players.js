// backend/routes/players.js
const express = require('express');
const supabase = require('../config/db');
const router = express.Router();

// Get all players
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('players').select('*');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;