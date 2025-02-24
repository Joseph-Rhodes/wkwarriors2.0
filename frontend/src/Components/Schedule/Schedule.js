import React, { useState, useEffect } from "react";
import "./Schedule.css";

const Schedule = () => {
  const [activeTab, setActiveTab] = useState("UPCOMING");
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch(`https://wkwarriors.onrender.com/api/schedule?type=${activeTab}`) // Fetch upcoming or past games
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((error) => console.error("Error fetching schedule:", error));
  }, [activeTab]);

  return (
    <div className="schedule-page">
      <div className="schedule-title-header">
        <h1>West Kirby Warriors 2025-2026 Schedule</h1>
      </div>
      <div className="schedule-header">
        <div className="toggle-container">
          <button
            className={`toggle-button ${activeTab === "UPCOMING" ? "active" : ""}`}
            onClick={() => setActiveTab("UPCOMING")}
          >
            UPCOMING
          </button>
          <button
            className={`toggle-button ${activeTab === "PAST" ? "active" : ""}`}
            onClick={() => setActiveTab("PAST")}
          >
            PAST
          </button>
        </div>
      </div>

      {/* Schedule Cards */}
      <div className="schedule-container">
        {games.map((game) => (
          <div key={game.gid} className="schedule-card">
            <div className="schedule-card-header">
              <span className="league-name">{game.game_type}</span>
              <span className="game-time">{new Date(game.game_date).toDateString()} • {game.game_time} {game.time_zone}</span>
            </div>
            <hr />
            <div className="schedule-card-body">
              <div className="team-info">
                <img src={game.opponent_logo} alt={game.opponent_name} className="team-logo" />
                <span className="team-name">
                  {game.location === "Away" ? "@ " : ""}
                  {game.opponent_name}
                </span>
              </div>
              {game.warriors_score !== null && game.opponent_score !== null ? (
                <div className={`score ${game.warriors_score < game.opponent_score ? 'loss' : 'win'}`}>
                  <span>{game.warriors_score}-{game.opponent_score}</span>
                </div>
              ) : (
                <div className="score">
                  {/* <span className="upcoming-game">TBD</span> */}
                </div>
              )}
            </div>
            <div className="schedule-card-footer">
              <span>{game.stadium}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
