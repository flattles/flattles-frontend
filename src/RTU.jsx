import { useState, useEffect } from 'react';
import './RTU.css';

const RealTimeUpdates = () => {
  // const [ws, setWs] = useState(null);
  // const [message, setMessage] = useState('');
  const [clientId, setClientId] = useState('');
  const [gameboard, setGameboard] = useState([]);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8080');

    websocket.onopen = () => {
      console.log('WebSocket is connected');
      // Generate a unique client ID
      const id = Math.floor(Math.random() * 1000);
      setClientId(id);
    };

    websocket.onmessage = (evt) => {
      const data = JSON.parse(evt.data);
      console.log(data);

      if (data.type === 'UPDATE_BOARD') {
        data.boardState.map((tile) => {
          console.log(tile.x_coord, tile.y_coord, tile.entity_type);
        });
      }

      const board = [];
      while (data.boardState.length) board.push(data.boardState.splice(0, 5));
      console.log(board);

      setGameboard(board);
    };

    websocket.onclose = () => {
      console.log('WebSocket is closed');
    };

    // setWs(websocket);
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

  // const handleInputChange = (event) => {
  //     setMessage(event.target.value);
  // };
  const cellStyle = {
    border: '1px solid #f00',
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    textAlign: 'center',
  };

  return (
    <div>
      <h1>Real-time Updates with WebSockets - Client {clientId}</h1>
      <div>
        <ul id="hexGrid">
          {gameboard.map((row) =>
            row.map((tile, index) => (
              <li className="hex" key={index}>
                <div className="hexIn">
                  <a className="hexLink" href="#">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSFNyDqJM9CMlVXrA2KzW0yFoP9jE2ROcYMw&s"
                      alt=""
                    />
                    <span style={{marginTop: '70px'}}>{tile.x_coord + tile.y_coord + tile.entity_type}</span>
                  </a>
                </div>
              </li>
            ))
          )}
        </ul>
        <table id="board">
          <tbody>
            {gameboard.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((tile, index) => (
                  <td key={index}>
                    <span style={cellStyle}>
                      {tile.x_coord + tile.y_coord + tile.entity_type}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <input type="text" value={message}
            onChange={handleInputChange} />
          <button onClick={sendMessage}>
            Send Message
          </button> */}
    </div>
  );
};

export default RealTimeUpdates;
