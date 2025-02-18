import PropTypes from 'prop-types';

export default function Stats(props) {
  const  { stats } = props;

  return (
    <div>
      <h2>{stats.name}</h2>
      <p>
        Health: {stats.health}, Speed: {stats.speed}, Damage: {stats.damage},
        Range: {stats.range}
      </p>
    </div>
  );
}

Stats.propTypes = {
  stats: PropTypes.object.isRequired,
};
