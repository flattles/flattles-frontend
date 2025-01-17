import { useState, useEffect } from 'react';
import './RTU.css';

const RealTimeUpdates = () => {
  const [clientId, setClientId] = useState('');
  const [gameboard, setGameboard] = useState([]);

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
        while (data.length) board.push(data.splice(0, 5));
        setGameboard(board);
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
            board.push(data.boardState.splice(0, 5));
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
  //         setMessage('');
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
      {/* <button onClick={sendMessage}>Send Message</button> */}
    </>
  );
};

export default RealTimeUpdates;
