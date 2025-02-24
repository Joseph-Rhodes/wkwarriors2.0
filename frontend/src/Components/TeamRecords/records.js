import React, { useEffect, useState } from 'react';
import './records.css';

const Records = () => {
  const [records, setRecords] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch('https://wkwarriors.onrender.com/api/teamRecords');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRecords(data);
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };

    const fetchPlayers = async () => {
      try {
        const response = await fetch('https://wkwarriors.onrender.com/api/players');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchRecords();
    fetchPlayers();
  }, []);

  // Merge records with player data
  const mergedRecords = records.map(record => {
    const player = players.find(p => p.pid === record.pid);
    return {
      ...record,
      playerName: player ? `${player.fname} ${player.lname}` : 'Unknown',
      profile_pic_url: player ? player.profile_pic_url : ''
    };
  });

  // Group records by category
  const groupedRecords = mergedRecords.reduce((acc, record) => {
    if (!acc[record.category]) {
      acc[record.category] = [];
    }
    acc[record.category].push(record);
    return acc;
  }, {});

  // Mapping for category abbreviations
  const categoryAbbreviations = {
    Points: 'PTS',
    Rebounds: 'RBS',
    Assists: 'AST',
    Blocks: 'BLK',
    Steals: 'STL'
  };

  return (
    <div className="records-container">
      <div className="records-container-header">
        <h1>Team Records</h1>
      </div>
      <div className="records-content">
        {Object.keys(groupedRecords).map(category => (
          <div key={category}>
            <h2 style={{ color: 'white' }}>{category}</h2>
            <div className="records-grid">
              {groupedRecords[category].map((record) => (
                <div className="record-item" key={record.record_id}>
                  <div className="record-details">
                    <div className="record-value-container">
                      <span className="record-value">{record.record_value}</span>
                      <span className="record-abbreviation">{categoryAbbreviations[category]}</span>
                    </div>
                    <span className="record-first-name">{record.playerName.split(' ')[0]}</span>
                    <span className="record-last-name">{record.playerName.split(' ')[1]}</span>
                  </div>
                  <img src={record.profile_pic_url} alt={record.playerName} className="record-image" />
                </div>
              ))}
            </div>
            <hr style={{ margin: '2rem 4rem', borderColor: 'white' }} /> {/* Break line */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Records;