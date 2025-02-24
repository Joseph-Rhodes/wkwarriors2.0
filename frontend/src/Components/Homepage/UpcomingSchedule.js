import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UpcomingSchedule.css";

const UpcomingSchedule = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchUpcomingGames = async () => {
      try {
        const response = await fetch("https://wkwarriors.onrender.com/api/schedule?type=UPCOMING");
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error("Error fetching upcoming games:", error);
      }
    };

    fetchUpcomingGames();
  }, []);

  return (
    <div className="upcoming-schedule-container">
      <h2 className="title">Upcoming Games</h2>
      <div className="games-list">
        {games.length > 0 ? (
          games.map((game) => (
            <div key={game.gid} className="game-item">
              <Link to={`/schedule`} style={{ textDecoration: "none" }} className="game-name">
                Game vs. {game.opponent_name}
              </Link>
              <p>{game.game_type}</p>
              <p>{new Date(game.game_date).toDateString()} | {game.stadium}</p>
            </div>
          ))
        ) : (
          <p>No upcoming games scheduled.</p>
        )}
      </div>
      <div className="button-container">
        <Link to="/schedule" className="schedule-button">
          See More
        </Link>
      </div>
    </div>
  );
};

export default UpcomingSchedule;
