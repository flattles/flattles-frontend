import PropTypes from 'prop-types';
import { mockShipData } from "../mockData";

export default function Stats(props) {
  const { player } = props;

  const stats = mockShipData.find((ship) => ship.player === player);

  if (!stats) {
    return <div className="player-stats">No stats found for player {player}.</div>;
  }

  return (
    <div className="player-stats">
      <h3>{stats.name}</h3>
      <div className="stat-group">
        <label>Health:</label>
        <span className="stat-value">{stats.health} / {stats.maxHealth || stats.health}</span>
      </div>
      <div className="stat-group">
        <label>Speed:</label>
        <span className="stat-value">{stats.speed}</span>
      </div>
      <div className="stat-group">
        <label>Damage:</label>
        <span className="stat-value">{stats.damage}</span>
      </div>
      <div className="stat-group">
        <label>Range:</label>
        <span className="stat-value">{stats.range}</span>
      </div>
      {}
    </div>
  );
}

Stats.propTypes = {
  player: PropTypes.number.isRequired,
};