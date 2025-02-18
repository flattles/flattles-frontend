import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Attack(props) {
  const { player, detectedShips } = props;
  const [selectedPlayer, setSelectedPlayer] = useState(0);

  useEffect(() => {
    if (detectedShips.length > 0) {
      setSelectedPlayer(detectedShips[0].player);
    }
  }, [detectedShips]);

  const handleSelectionChange = (event) => {
    setSelectedPlayer(event.target.value);
  };

  const sendAttack = (target) => {
    fetch(`http${import.meta.env.VITE_MIDDLEWARE_URI}/attack`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        player: player,
        target: target,
      }),
    });
  };

  return (
    <>
      <select value={selectedPlayer} onChange={handleSelectionChange}>
        <option disabled value={0}>
          Select a ship
        </option>
        {detectedShips.map((ship, index) => (
          <option key={index} value={ship.player}>
            Player {ship.player} - {ship.tile}
          </option>
        ))}
      </select>
      <button onClick={() => sendAttack(selectedPlayer)}>Fire</button>
    </>
  );
}

Attack.propTypes = {
  player: PropTypes.number.isRequired,
  detectedShips: PropTypes.array.isRequired,
};
