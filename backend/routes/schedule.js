// backend/routes/schedule.js
const express = require("express");
const supabase = require("../config/db");
const router = express.Router();

// Fetch schedule with filtering
router.get("/", async (req, res) => {
  const { type } = req.query;
  let query = supabase.from("schedule").select("*").order("game_date", { ascending: false }).order("game_time", { ascending: false });

  if (type === "UPCOMING") {
    query = supabase.from("schedule").select("*").gte("game_date", new Date().toISOString().split('T')[0]).order("game_date", { ascending: true }).order("game_time", { ascending: true });
  } else if (type === "PAST") {
    query = supabase.from("schedule").select("*").lt("game_date", new Date().toISOString().split('T')[0]).order("game_date", { ascending: false }).order("game_time", { ascending: false });
  }

  try {
    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("Error fetching schedule:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;