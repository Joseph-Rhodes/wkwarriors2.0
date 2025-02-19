// backend/routes/teamRecords.js
const express = require('express');
const pool = require('../config/db'); // Ensure this path points to your db.js
const router = express.Router();

// Get all team records
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM team_records ORDER BY record_value DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;