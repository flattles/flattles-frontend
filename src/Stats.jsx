import PropTypes from 'prop-types';

export default function Stats(props) {
  const { stats } = props;

  if (!stats) {
    return <div className="player-stats">No stats found for player.</div>;
  }

  return (
    <div className="player-stats">
      <h3>{stats.name}</h3>
      <div className="stat-group">
        <label>Base Health:</label>
        <span className="stat-value">
          {stats.base.health} / {stats.base.maxHealth || stats.base.health}
        </span>
      </div>
      <div className="stat-group">
        <label>Ship Health:</label>
        <span className="stat-value">
          {stats.ship.health} / {stats.ship.maxHealth || stats.ship.health}
        </span>
      </div>
      <div className="stat-group">
        <label>Damage:</label>
        <span className="stat-value">{stats.ship.damage}</span>
      </div>
      <div className="stat-group">
        <label>Damage Range:</label>
        <span className="stat-value">{stats.ship.range}</span>
      </div>
      <div className="stat-group">
        <label>Movement Speed:</label>
        <span className="stat-value">{stats.ship.speed}</span>
      </div>
    </div>
  );
}

Stats.propTypes = {
  stats: PropTypes.object.isRequired,
};
