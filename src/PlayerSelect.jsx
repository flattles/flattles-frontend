import { useState } from 'react';
import { useNavigate } from 'react-router';
import { players } from '../env';

export default function PlayerSelect() {
  const [selectedPlayer, setSelectedPlayer] = useState(players[0]);
  const navigate = useNavigate();

  const handleSelectionChange = (event) => {
    setSelectedPlayer(event.target.value);
  };

  const handleConfirm = () => {
    navigate(`/hud?player=${selectedPlayer}`);
  };

  return (
    <div>
      <h1>Welcome to Flattles</h1>
      <h2>Please select your player</h2>
      <select value={selectedPlayer} onChange={handleSelectionChange}>
        {players.map((player) => (
          <option key={player} value={player}>
            Player {player}
          </option>
        ))}
      </select>
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  );
}
