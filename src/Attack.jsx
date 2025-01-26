import { useState } from 'react';
import PropTypes from 'prop-types';

const players = [1, 2, 3, 4];

export default function Attack(props) {
  const player = props.player;
  const filteredPlayers = players.filter((p) => p !== player);
  const [selectedPlayer, setSelectedPlayer] = useState(filteredPlayers[0]);

  const handleSelectionChange = (event) => {
    setSelectedPlayer(event.target.value);
  };

  const sendMessage = () => {
    fetch('http://localhost:3000/attack', {
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
