// backend/routes/players.js
const express = require('express');
const pool = require('../config/db'); // Ensure this path points to your db.js
const router = express.Router();

// Get all players
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM coaches');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;