import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

export default function Stats(prop) {
  const player = prop.player;
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/ship?player=${player}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStats(data[0]);
      });
  }, [player]);

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
