import React, { useEffect, useState } from "react";
import "./Roster.css";

const Roster = () => {
  const [players, setPlayers] = useState([]);
  const [stats, setStats] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [isListView, setIsListView] = useState(false);
  const [isM2View, setM2View] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await fetch("http://localhost:3000/api/players");
      const data = await response.json();
      setPlayers(data);
    };

    const fetchStats = async () => {
      const response = await fetch("http://localhost:3000/api/stats");
      const data = await response.json();
      setStats(data);
    };

    const fetchCoaches = async () => {
      const response = await fetch("http://localhost:3000/api/coaches");
      const data = await response.json();
      setCoaches(data);
    };

    fetchPlayers();
    fetchStats();
    fetchCoaches();
  }, []);

  const toggleView = () => {
    setIsListView(!isListView);
  };

  const toggleTeamLevelView = () => {
    setM2View(!isM2View);
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getPlayerStats = (pid) => {
    const playerStats = stats.find((stat) => stat.pid === pid);
    if (!playerStats) return null;
    return {
      pointsPerGame: (playerStats.total_points / playerStats.games_played).toFixed(1),
      assistsPerGame: (playerStats.total_assists / playerStats.games_played).toFixed(1),
      reboundsPerGame: (playerStats.total_rebounds / playerStats.games_played).toFixed(1),
      blocksPerGame: (playerStats.total_blocks / playerStats.games_played).toFixed(1),
    };
  };

  const filteredPlayers = players.filter((player) =>
    isM2View ? player.team_level === "M2" : player.team_level === "M1"
  );

  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let valA, valB;

    if (sortConfig.key === "fname") {
      valA = `${a.fname} ${a.lname}`;
      valB = `${b.fname} ${b.lname}`;
    } else if (sortConfig.key === "position") {
      valA = a.position;
      valB = b.position;
    } else if (sortConfig.key === "date_signed") {
      valA = new Date(a.date_signed);
      valB = new Date(b.date_signed);
    } else if (sortConfig.key === "dob") {
      valA = new Date().getFullYear() - new Date(a.dob).getFullYear();
      valB = new Date().getFullYear() - new Date(b.dob).getFullYear();
    } else if (sortConfig.key === "height") {
      valA = parseFloat(a.height);
      valB = parseFloat(b.height);
    } else {
      valA = sortConfig.key in a ? a[sortConfig.key] : getPlayerStats(a.pid)?.[sortConfig.key];
      valB = sortConfig.key in b ? b[sortConfig.key] : getPlayerStats(b.pid)?.[sortConfig.key];
    }

    if (valA == null || valB == null) return 0;

    return sortConfig.direction === "asc"
      ? valA.toString().localeCompare(valB.toString(), undefined, { numeric: true })
      : valB.toString().localeCompare(valA.toString(), undefined, { numeric: true });
  });

  return (
    <div className="roster-container">
      <div className="roster-container-header">
        <h1>Team Roster</h1>
        <div className="roster-button-container">
          <button className="team-level-button" onClick={toggleTeamLevelView}>
            {isM2View ? "View M1" : "View M2"}
          </button>
          <button className="list-toggle-button" onClick={toggleView}>
            {isListView ? "Card View" : "List View"}
          </button>
        </div>
      </div>

      {isListView ? (
        <div className="list-view">
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort("fname")}>Name</th>
                <th onClick={() => handleSort("number")}>Number</th>
                <th onClick={() => handleSort("position")}>Position</th>
                <th onClick={() => handleSort("date_signed")}>Year Signed</th>
                <th onClick={() => handleSort("dob")}>Age</th>
                <th onClick={() => handleSort("height")}>Height</th>
                <th onClick={() => handleSort("pointsPerGame")}>PPG</th>
                <th onClick={() => handleSort("reboundsPerGame")}>RPG</th>
                <th onClick={() => handleSort("assistsPerGame")}>APG</th>
                <th onClick={() => handleSort("blocksPerGame")}>BPG</th>
              </tr>
            </thead>
            <tbody>
              {sortedPlayers.map((player) => {
                const playerStats = getPlayerStats(player.pid);
                return (
                  <tr key={player.pid}>
                    <td>{player.fname} {player.lname}</td>
                    <td>{player.number}</td>
                    <td>{player.position}</td>
                    <td>{new Date(player.date_signed).getFullYear()}</td>
                    <td>{new Date().getFullYear() - new Date(player.dob).getFullYear()}</td>
                    <td>{player.height}</td>
                    {playerStats ? (
                      <>
                        <td>{playerStats.pointsPerGame}</td>
                        <td>{playerStats.reboundsPerGame}</td>
                        <td>{playerStats.assistsPerGame}</td>
                        <td>{playerStats.blocksPerGame}</td>
                      </>
                    ) : (
                      <td colSpan="4">No stats available</td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="coaches-table">
            <table>
              <thead>
                <tr>
                  <th>Coaching Staff</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {coaches
                  .filter(coach => isM2View ? coach.coach_team_level === "M2" : coach.coach_team_level === "M1")
                  .map((coach) => (
                    <tr key={coach.id}>
                      <td>{coach.coach_type}</td>
                      <td>{`${coach.first_name} ${coach.last_name}`}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        
      ) : (
        <>
          <div className="player-container">
            {sortedPlayers.map((player) => {
              const playerStats = getPlayerStats(player.pid);
              return (
                <div key={player.pid} className="player-card">
                  <img src={player.profile_pic_url} alt={`${player.fname} ${player.lname}`} />
                  <div className="player-card-title">
                    <div className="player-name">{player.fname} {player.lname}</div>
                    <div className="player-number">#{player.number}</div>
                  </div>
                  <div className="player-info">
                    <p><strong>Year Signed:</strong> {new Date(player.date_signed).getFullYear()}</p>
                    <p><strong>Height:</strong> {player.height}</p>
                    <p><strong>Age:</strong> {new Date().getFullYear() - new Date(player.dob).getFullYear()}</p>
                    <p><strong>Position:</strong> {player.position}</p>
                    {playerStats && (
                      <>
                        <p><strong>PPG:</strong> {playerStats.pointsPerGame} <strong>RPG:</strong> {playerStats.reboundsPerGame}</p>
                        <p><strong>APG:</strong> {playerStats.assistsPerGame} <strong>BPG:</strong> {playerStats.blocksPerGame}</p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <hr className="roster-divider" />
          <div className="coach-container">
            {coaches
              .filter(coach => isM2View ? coach.coach_team_level === "M2" : coach.coach_team_level === "M1")
              .map((coach) => (
                <div key={coach.id} className="coach-card">
                  <img src={coach.coach_profile_pic} alt={`${coach.first_name} ${coach.last_name}`} />
                  <div className="coach-card-info">
                    <div className="coach-name">{coach.first_name} {coach.last_name}</div>
                    <div className="coach-type">{coach.coach_type}</div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Roster;
