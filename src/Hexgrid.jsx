import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
// import { HexGrid, Layout, Hexagon, Text } from 'react-hexgrid';
import Attack from './Attack';
import Stats from './Stats';
import ship from './assets/enterprise.png';
import './Hexgrid.css';

export default function Hexgrid() {
  const [gameboard, setGameboard] = useState([]);

  const [searchParams] = useSearchParams();
  const player = Number(searchParams.get('player'));

  useEffect(() => {
    fetch('http://localhost:3000/board', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const board = [];
        while (data.length) board.push(data.splice(0, 10));
        setGameboard(board);
      });
  }, [player]);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8080');

    websocket.onopen = () => {
      console.log('WebSocket is connected');
    };

    websocket.onmessage = (evt) => {
      const data = JSON.parse(evt.data);
      console.log(data);

      switch (data.type) {
        case 'UPDATE_BOARD': {
          const board = [];
          while (data.boardState.length)
            board.push(data.boardState.splice(0, 10));
          setGameboard(board);
          break;
        }
        case 'UPDATE_PLAYER_STATS': {
          console.log('Player stats updated:', data);
          break;
        }
        default:
          console.log('Unknown message type');
      }
    };

    websocket.onclose = () => {
      console.log('WebSocket is closed');
    };
  }, []);

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
      <Stats player={player} />
      <Attack player={player} />
      {/* <HexGrid width={1000} height={800}>
        <Layout size={{ x: 5, y: 5 }} flat={true} spacing={1.1} origin={{ x: -35, y: -40 }}>
          {gameboard.map((row, rowIndex) => (
            <>
              {row.map((tile, index) => (
                  <Hexagon key={index} q={rowIndex} r={Math.floor(-rowIndex/2) + index}>
                    <Text>{tile.x_coord + tile.y_coord}</Text>
                  </Hexagon>
              ))}
            </>
          ))}
        </Layout>
      </HexGrid> */}
    </>
  );
}
