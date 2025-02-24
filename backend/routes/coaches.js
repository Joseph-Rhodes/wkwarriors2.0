const express = require('express');
const supabase = require('../config/db');
const router = express.Router();

// Get all coaches
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('coaches').select('*');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;