import { useState } from 'react';
import PropTypes from 'prop-types';
import { players } from '../env';

export default function Attack(props) {
  const { player } = props;
  const filteredPlayers = players.filter((p) => p !== player);
  const [selectedPlayer, setSelectedPlayer] = useState(filteredPlayers[0]);

  const handleSelectionChange = (event) => {
    setSelectedPlayer(Number(event.target.value));
  };

  const sendMessage = () => {
    fetch('http://localhost:3000/attack', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        player: player,
        target: selectedPlayer, 
      }),
    });
    alert(`Player ${player} attacked Player ${selectedPlayer}!`); 
  };

  return (
    <div className="attack-interface"> {/* Container for styling */}
      <h3>Initiate Attack</h3>
      <select value={selectedPlayer} onChange={handleSelectionChange}>
        {filteredPlayers.map((target) => (
          <option key={target} value={target}>
            Target Player {target}
          </option>
        ))}
      </select>
      <button onClick={sendMessage} className="attack-button">FIRE!</button>
    </div>
  );
}

Attack.propTypes = {
  player: PropTypes.number.isRequired,
};