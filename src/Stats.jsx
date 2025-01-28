import PropTypes from 'prop-types';
import { mockShipData } from "../mockData";

export default function Stats(props) {
  const  { player } = props;
  
  const stats = mockShipData.find((ship) => ship.player === player);

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
  player: PropTypes.number.isRequired,
};
