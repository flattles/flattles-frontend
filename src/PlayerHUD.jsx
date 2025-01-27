import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import Attack from './Attack';
import Stats from './Stats';
import Hexgrid from './Hexgrid';

export default function PlayerHUD() {
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
      <Hexgrid player={player} gameboard={gameboard} />
      <Stats player={player} />
      <Attack player={player} />
    </>
  );
}
