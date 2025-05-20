import PropTypes from 'prop-types';
import ship from './assets/enterprise.png';
import base from './assets/base.png';

export default function Hexgrid(props) {
  const { gameboard, rangeBoard, moveBoard, boardStats } = props;

  return (
    <div className="hex-grid">
      {gameboard.map((row, rowIndex) => (
        <div className="hex-row" key={rowIndex}>
          {row.map((tile, index) => (
            <div
              className="hex"
              key={index}
              style={
                rangeBoard.includes(tile.x_coord + tile.y_coord)
                  ? { backgroundColor: 'rgba(255, 0, 43, 0.27)' }
                  : { backgroundColor: 'rgba(0, 255, 145, 0.273)' }
              }
            >
              {tile.entity_type === 'ship' ? (
                <img
                  className={
                    boardStats.ships &&
                    boardStats.ships.find((s) => s.player === tile.entity_id) &&
                    boardStats.ships.find((s) => s.player === tile.entity_id)
                      .health <= 0
                      ? 'destroyed'
                      : 'ship'
                  }
                  src={ship}
                  alt="Player Ship"
                />
              ) : null}
              {tile.entity_type === 'base' ? (
                <img
                  className={
                    boardStats.bases &&
                    boardStats.bases.find((s) => s.player === tile.entity_id) &&
                    boardStats.bases.find((s) => s.player === tile.entity_id)
                      .health <= 0
                      ? 'destroyed'
                      : ''
                  }
                  src={base}
                  alt="Player Base"
                />
              ) : null}
              <p
                style={
                  moveBoard.includes(tile.x_coord + tile.y_coord)
                    ? { color: '#34eb3d' }
                    : { color: 'white' }
                }
              >
                {tile.x_coord + tile.y_coord}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

Hexgrid.propTypes = {
  gameboard: PropTypes.array.isRequired,
  rangeBoard: PropTypes.array.isRequired,
  moveBoard: PropTypes.array.isRequired,
  boardStats: PropTypes.object.isRequired,
};
