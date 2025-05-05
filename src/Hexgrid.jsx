import PropTypes from 'prop-types';
import ship from './assets/enterprise.png';
import './Hexgrid.css';

export default function Hexgrid(props) {
  const  { player, gameboard } = props;

  return (
    <div className="hex-grid">
      {gameboard.map((row, rowIndex) => (
        <div className="hex-row" key={rowIndex}>
          {row.map((tile, index) => (
            <div className="hex" key={index}>
              {tile.entity_type === 'ship' ? (
                <img
                  src={ship}
                  alt="USS Enterprise Refit Complete!"
                  width="70px"
                  height="50px"
                />
              ) : null}
              <p style={{ marginTop: '-22px' }}>
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
  player: PropTypes.number.isRequired,
  gameboard: PropTypes.array.isRequired,
};