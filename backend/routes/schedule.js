const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// Fetch schedule with filtering
router.get("/", async (req, res) => {
  const { type } = req.query;
  let query = "SELECT * FROM schedule ORDER BY game_date DESC, game_time DESC";

  if (type === "UPCOMING") {
    query = "SELECT * FROM schedule WHERE game_date >= CURRENT_DATE ORDER BY game_date ASC, game_time ASC";
  } else if (type === "PAST") {
    query = "SELECT * FROM schedule WHERE game_date < CURRENT_DATE ORDER BY game_date DESC, game_time DESC";
  }

  try {
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching schedule:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
