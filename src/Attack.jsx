import { useState } from 'react';
import PropTypes from 'prop-types';
import { players } from '../env';

export default function Attack(props) {
  const  { player } = props;
  const filteredPlayers = players.filter((p) => p !== player);
  const [selectedPlayer, setSelectedPlayer] = useState(filteredPlayers[0]);

  const handleSelectionChange = (event) => {
    setSelectedPlayer(event.target.value);
  };

  const sendMessage = () => {
    fetch(`https://${import.meta.env.VITE_MIDDLEWARE_URI}/attack`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        player: player,
        target: '1',
      }),
    });
  };

  return (
    <>
      <select value={selectedPlayer} onChange={handleSelectionChange}>
        {filteredPlayers.map((player) => (
          <option key={player} value={player}>
            Player {player}
          </option>
        ))}
      </select>
      <button onClick={sendMessage}>Fire</button>
    </>
  );
};

Attack.propTypes = {
  player: PropTypes.number.isRequired,
};
