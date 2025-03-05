import PropTypes from 'prop-types';
import ship from './assets/enterprise.png';
import base from './assets/base.png';
import './Hexgrid.css';

export default function Hexgrid(props) {
  const { player, gameboard, rangeBoard, boardStats } = props;

  return (
    <>
      <h1>Flattles Command - Player {player}</h1>
      <div className="hex-grid">
        {gameboard.map((row, rowIndex) => (
          <div className="hex-row" key={rowIndex}>
            {row.map((tile, index) => (
              <div className="hex" key={index}>
                {tile.entity_type === 'ship' ? (
                  <img
                    className={
                      boardStats.ships.health &&
                      boardStats.ships.find((s) => s.player === tile.entity_id)
                        .health <= 0
                        ? 'destroyed'
                        : 'ship'
                    }
                    src={ship}
                    alt="Player Ship"
                    width="70px"
                    height="50px"
                  />
                ) : null}
                {tile.entity_type === 'base' ? (
                  <img
                    className={
                      boardStats.ships.health &&
                      boardStats.ships.find((s) => s.player === tile.entity_id)
                        .health <= 0
                        ? 'destroyed'
                        : ''
                    }
                    src={base}
                    alt="Player Base"
                    width="70px"
                    height="50px"
                  />
                ) : null}
                {rangeBoard.includes(tile.x_coord + tile.y_coord) ? (
                  <p style={{ marginTop: '-22px', color: 'red' }}>
                    {tile.x_coord + tile.y_coord}
                  </p>
                ) : (
                  <p style={{ marginTop: '-22px' }}>
                    {tile.x_coord + tile.y_coord}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

Hexgrid.propTypes = {
  player: PropTypes.number.isRequired,
  gameboard: PropTypes.array.isRequired,
  rangeBoard: PropTypes.array.isRequired,
  boardStats: PropTypes.object.isRequired,
};
