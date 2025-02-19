import React, { useState, useEffect } from "react";
import "./Stats.css";

const Stats = () => {
  const [players, setPlayers] = useState([]);
  const [stats, setStats] = useState([]);
  const [isM2View, setM2View] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    const fetchData = async () => {
      const [playersRes, statsRes] = await Promise.all([
        fetch("http://localhost:3000/api/players"),
        fetch("http://localhost:3000/api/stats")
      ]);
      
      const playersData = await playersRes.json();
      const statsData = await statsRes.json();
      
      setPlayers(playersData);
      setStats(statsData);
    };

    fetchData();
  }, []);

  const toggleTeamLevelView = () => {
    setM2View(!isM2View);
  };

  const calculateLeaders = () => {
    if (!stats.length || !players.length) return null;

    const calculatePerGame = (total, games) => (total / games).toFixed(1);

    const getLeaderInfo = (statKey, label) => {
      const teamStats = stats.filter(stat => {
        const player = players.find(p => p.pid === stat.pid);
        return isM2View ? player.team_level === "M2" : player.team_level === "M1";
      });

      const leader = [...teamStats].sort((a, b) => 
        calculatePerGame(b[statKey], b.games_played) - calculatePerGame(a[statKey], a.games_played)
      )[0];
      
      const player = players.find(p => p.pid === leader.pid);
      return {
        name: `${player.fname} ${player.lname}`,
        position: player.position,
        value: calculatePerGame(leader[statKey], leader.games_played)
      };
    };

    return {
      points: getLeaderInfo('total_points', 'Points'),
      rebounds: getLeaderInfo('total_rebounds', 'Rebounds'),
      assists: getLeaderInfo('total_assists', 'Assists'),
      steals: getLeaderInfo('total_steals', 'Steals'),
      blocks: getLeaderInfo('total_blocks', 'Blocks')
    };
  };

  const leaders = calculateLeaders();

  const handleSort = (key) => {
    setSortConfig((prevSort) => ({
      key,
      direction: prevSort.key === key && prevSort.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortedStats = () => {
    const filteredStats = stats.filter(stat => {
      const player = players.find(p => p.pid === stat.pid);
      return isM2View ? player?.team_level === "M2" : player?.team_level === "M1";
    });

    if (!sortConfig.key) return filteredStats;

    return [...filteredStats].sort((a, b) => {
      let aValue, bValue;
      const playerA = players.find(p => p.pid === a.pid);
      const playerB = players.find(p => p.pid === b.pid);

      switch (sortConfig.key) {
        case 'name':
          aValue = `${playerA.fname} ${playerA.lname}`;
          bValue = `${playerB.fname} ${playerB.lname}`;
          break;
        case 'gp':
          aValue = a.games_played;
          bValue = b.games_played;
          break;
        default:
          aValue = Number((a[`total_${sortConfig.key}`] / a.games_played).toFixed(1));
          bValue = Number((b[`total_${sortConfig.key}`] / b.games_played).toFixed(1));
      }

      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  return (
    <div className="stats-container">
      <div className="stats-container-header">
        <h1>Team Stats</h1>
        <div className="stats-button-container">
          <button className="team-level-button" onClick={toggleTeamLevelView}>
            {isM2View ? "View M1" : "View M2"}
          </button>
        </div>
      </div>
      {leaders && (
        <div className="team-leaders-section">
          <h2>Leaders</h2>
          <div className="leaders-grid">
            <div className="leader-card">
              <h3>Points per Game</h3>
              <div className="leader-info">
                <div className="leader-name-position">
                  <span className="leader-name">{leaders.points.name}</span>
                  <span className="leader-position">{leaders.points.position}</span>
                </div>
                <span className="leader-value">{leaders.points.value}</span>
              </div>
            </div>
            <div className="leader-card">
              <h3>Rebounds per Game</h3>
              <div className="leader-info">
                <div className="leader-name-position">
                  <span className="leader-name">{leaders.rebounds.name}</span>
                  <span className="leader-position">{leaders.rebounds.position}</span>
                </div>
                <span className="leader-value">{leaders.rebounds.value}</span>
              </div>
            </div>
            <div className="leader-card">
              <h3>Assists per Game</h3>
              <div className="leader-info">
                <div className="leader-name-position">
                  <span className="leader-name">{leaders.assists.name}</span>
                  <span className="leader-position">{leaders.assists.position}</span>
                </div>
                <span className="leader-value">{leaders.assists.value}</span>
              </div>
            </div>
            <div className="leader-card">
              <h3>Steals per Game</h3>
              <div className="leader-info">
                <div className="leader-name-position">
                  <span className="leader-name">{leaders.steals.name}</span>
                  <span className="leader-position">{leaders.steals.position}</span>
                </div>
                <span className="leader-value">{leaders.steals.value}</span>
              </div>
            </div>
            <div className="leader-card">
              <h3>Blocks per Game</h3>
              <div className="leader-info">
                <div className="leader-name-position">
                  <span className="leader-name">{leaders.blocks.name}</span>
                  <span className="leader-position">{leaders.blocks.position}</span>
                </div>
                <span className="leader-value">{leaders.blocks.value}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="player-stats-section">
        <h2>Player Stats</h2>
        <div className="stats-table-container">
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort('name')}>Name</th>
                <th onClick={() => handleSort('gp')}>GP</th>
                <th onClick={() => handleSort('points')}>PTS</th>
                <th onClick={() => handleSort('rebounds')}>REB</th>
                <th onClick={() => handleSort('assists')}>AST</th>
                <th onClick={() => handleSort('steals')}>STL</th>
                <th onClick={() => handleSort('blocks')}>BLK</th>
                <th onClick={() => handleSort('turnovers')}>TO</th>
              </tr>
            </thead>
            <tbody>
              {getSortedStats().map(stat => {
                const player = players.find(p => p.pid === stat.pid);
                if (!player) return null;
                
                return (
                  <tr key={stat.pid}>
                    <td>
                      {player.fname} {player.lname} <span className="player-position">{player.position}</span>
                    </td>
                    <td>{stat.games_played}</td>
                    <td>{(stat.total_points / stat.games_played).toFixed(1)}</td>
                    <td>{(stat.total_rebounds / stat.games_played).toFixed(1)}</td>
                    <td>{(stat.total_assists / stat.games_played).toFixed(1)}</td>
                    <td>{(stat.total_steals / stat.games_played).toFixed(1)}</td>
                    <td>{(stat.total_blocks / stat.games_played).toFixed(1)}</td>
                    <td>{(stat.total_turnovers / stat.games_played).toFixed(1)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Stats;