import { useState, useEffect } from 'react';
import './Hexgrid.css';
import {
  HexGrid,
  Layout,
  Hexagon,
  Text
} from 'react-hexgrid';

export default function Hexgrid() {
  const [clientId, setClientId] = useState('');
  const [gameboard, setGameboard] = useState([]);
  const [shipStats, setShipStats] = useState({});

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

    fetch(`http://localhost:3000/ship?player=1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setShipStats(data[0]);
      });
  }, []);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8080');

    websocket.onopen = () => {
      console.log('WebSocket is connected');
      const id = Math.floor(Math.random() * 1000); // Generate a unique client ID
      setClientId(id);
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

  // const sendMessage = () => {
  //     if (ws) {
  //         ws.send(JSON.stringify({
  //             type: 'message',
  //             payload: message,
  //             clientId: clientId
  //         }));
  //     }
  // };

  return (
    <>
      <h1>Flattles Command - Player {clientId}</h1>
      <div className="hex-grid">
        {gameboard.map((row, rowIndex) => (
          <div className="hex-row" key={rowIndex}>
            {row.map((tile, index) => (
              <div className="hex" key={index}>
                {tile.entity_type === 'ship' ? (
                  <img
                    src="https://media.moddb.com/cache/images/mods/1/27/26387/thumb_620x2000/USS_Enterprise_Refit.png"
                    alt="USS Enterprise Refit Complete!"
                    width="70px"
                    height="50px"
                  />
                ) : null}
                <p style={{ marginTop: '-3px' }}>
                  {tile.x_coord + tile.y_coord}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <HexGrid width={1000} height={800}>
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
      </HexGrid>
      {shipStats && (
        <div>
          <h2>{shipStats.name}</h2>
          <p>Health: {shipStats.health}, Speed: {shipStats.speed}, Damage: {shipStats.damage}, Range: {shipStats.range}</p>
        </div>
      )}
      {/* <button onClick={sendMessage}>Send Message</button> */}
    </>
  );
};
