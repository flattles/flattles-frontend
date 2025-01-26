import { useState } from 'react';
import { useNavigate } from 'react-router';

const players = [1, 2, 3, 4];

export default function PlayerSelect() {
  const [selectedPlayer, setSelectedPlayer] = useState(players[0]);
  const navigate = useNavigate();

  const handleSelectionChange = (event) => {
    setSelectedPlayer(event.target.value);
  };

  const handleConfirm = () => {
    navigate(`/hexgrid?player=${selectedPlayer}`);
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
