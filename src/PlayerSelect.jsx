import { useState } from 'react';
import { useNavigate } from 'react-router';
import { players } from '../env';

export default function PlayerSelect() {
  const [selectedPlayer, setSelectedPlayer] = useState(players[0]);
  const navigate = useNavigate();
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showRulesPopup, setShowRulesPopup] = useState(false); // New state for rules popup

  const handleSelectionChange = (event) => {
    setSelectedPlayer(Number(event.target.value));
  };

  const handleConfirm = () => {
    setShowConfirmPopup(true);
  };

  const handleConfirmPopupClose = () => {
    setShowConfirmPopup(false);
    navigate(`/hud?player=${selectedPlayer}`);
  };

  const handleShowRules = () => {
    setShowRulesPopup(true);
  };

  const handleCloseRules = () => {
    setShowRulesPopup(false);
  };

  const gameRules = [
    "Welcome to Flattles Command!",
    "Select your player to begin.",
    "Navigate the hexagonal grid to explore.",
    "Use the 'Fire' button to attack other players.",
    "Monitor your health and energy levels.",
    "The goal of the game is to...", // Add your actual game objective
    // Add more rules as needed
  ];

  return (
    <div className="player-select-container">
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
      <button onClick={handleShowRules} className="rules-button">Game Rules</button> {/* New button */}

      {/* Confirm Selection Popup */}
      {showConfirmPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Confirm Selection</h2>
            <p>You have selected Player {selectedPlayer}. Are you sure?</p>
            <button onClick={handleConfirmPopupClose} className="confirm-button">Yes, Proceed</button>
            <button onClick={() => setShowConfirmPopup(false)}>No, Go Back</button>
          </div>
        </div>
      )}

      {/* Game Rules Popup */}
      {showRulesPopup && (
        <div className="popup-overlay">
          <div className="popup rules-popup"> {/* Added a specific class for rules */}
            <h2>Game Rules</h2>
            <ul>
              {gameRules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
            <button onClick={handleCloseRules}>Close Rules</button>
          </div>
        </div>
      )}
    </div>
  );
}