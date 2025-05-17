import { useState } from 'react';
import { useNavigate } from 'react-router';
import { players } from '../env';

export default function PlayerSelect() {
  const [selectedPlayer, setSelectedPlayer] = useState(players[0]);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showRulesPopup, setShowRulesPopup] = useState(false);
  const navigate = useNavigate();

  const gameRules = [
    "Select your player to begin",
    "Move your ship to navigate the hexagonal grid",
    "Use the red range indicator to see attack range",
    "Select a target from the dropdown menu",
    "Use the 'FIRE!' button to attack other players",
    "Monitor your ship and base health levels",
    "Eliminate all other players to win the game",
  ];

  return (
    <div className="player-select-container">
      <h1>Welcome to Flattles Command</h1>
      <h2>Please select your player</h2>
      <select value={selectedPlayer} onChange={(event) => setSelectedPlayer(Number(event.target.value))}>
        {players.map((player) => (
          <option key={player} value={player}>
            Player {player}
          </option>
        ))}
      </select>
      <div className="button-container">
        <button onClick={() => setShowConfirmPopup(true)} className="join-button">Join</button>
        <button onClick={() => setShowRulesPopup(true)}>Game Rules</button>
      </div>

      {showConfirmPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Confirm Selection</h2>
            <p>You have selected Player {selectedPlayer}. Are you sure?</p>
            <button onClick={() => navigate(`/hud?player=${selectedPlayer}`)} className="confirm-button">Yes, Proceed</button>
            <button onClick={() => setShowConfirmPopup(false)}>No, Go Back</button>
          </div>
        </div>
      )}
      
      {showRulesPopup && (
        <div className="popup-overlay">
          <div className="popup rules-popup">
          <h2>Welcome to Flattles Command!</h2>
            <p>
              Navigate the starfield armed with only the knowledge of your ship&apos;s power and enemy positions. Each commander starts with a ship of varying attributes from their enemies, but with the same health for their base.
              <br/>
              <br/>
              Move, fire, and strategize turn by turn to attack enemies and defend your base. Destroy enemy ships and bases to eliminate them, and be the last one standing to claim victory in this tactical fog of war game!
              </p>
            <h2>Game Rules</h2>
            <ul>
              {gameRules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
            <button onClick={() => setShowRulesPopup(false)}>Close Rules</button>
          </div>
        </div>
      )}
    </div>
  );
}
