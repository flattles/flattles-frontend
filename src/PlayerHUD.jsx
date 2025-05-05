import { useSearchParams } from 'react-router';
import Attack from './Attack';
import Stats from './Stats';
import Hexgrid from './Hexgrid';
import { mockGameboard, mockShipData } from '../mockData';

const HealthBar = ({ health, maxHealth }) => {
  const percentage = (health / maxHealth) * 100;
  let fillClass = 'health-good';
  if (percentage < 30) {
    fillClass = 'health-low';
  } else if (percentage < 70) {
    fillClass = 'health-medium';
  }

  return (
    <div className="status-bar-item health-bar-container">
      <div className={`health-bar-fill ${fillClass}`} style={{ width: `${percentage}%` }}>
        {health}/{maxHealth}
      </div>
      <label>Health</label>
    </div>
  );
};

const EnergyBar = ({ energy, maxEnergy = 100 }) => {
  const percentage = (energy / maxEnergy) * 100;
  return (
    <div className="status-bar-item energy-bar-container">
      <div className="energy-bar-fill" style={{ width: `${percentage}%` }}>
        Energy: {energy}
      </div>
      <label>Energy</label>
    </div>
  );
};

export default function PlayerHUD() {
  const [searchParams] = useSearchParams();
  const player = Number(searchParams.get('player'));

  const gameboard = [];
  while (mockGameboard.length) gameboard.push(mockGameboard.splice(0, 10));

  const currentPlayerStats = mockShipData.find((ship) => ship.player === player);
  const currentHealth = currentPlayerStats?.health || 100;
  const maxHealth = currentPlayerStats?.maxHealth !== undefined ? currentPlayerStats.maxHealth : currentHealth;
  const currentEnergy = currentPlayerStats?.energy || 100;

  return (
    <div className="player-hud">
      <div className="hud-top">
        <h1>Flattles Command - Player {player}</h1>
      </div>

      <div className="hud-middle">
        <Hexgrid player={player} gameboard={gameboard} />
      </div>

      <div className="hud-bottom-container">
        {currentPlayerStats && (
          <div className="status-bar">
            <HealthBar health={currentHealth} maxHealth={maxHealth} />
            <EnergyBar energy={currentEnergy} />
          </div>
        )}
        <Stats player={player} />
        <Attack player={player} />
      </div>
    </div>
  );
}