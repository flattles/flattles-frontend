import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { getHexesWithinRange } from './Range';
import Attack from './Attack';
import Stats from './Stats';
import Hexgrid from './Hexgrid';

export default function PlayerHUD() {
  const [searchParams] = useSearchParams();
  const player = Number(searchParams.get('player'));

  const [gameboard, setGameboard] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetch(`http${import.meta.env.VITE_MIDDLEWARE_URI}/ship?player=${player}`, {
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

  useEffect(() => {
    fetch(`http${import.meta.env.VITE_MIDDLEWARE_URI}/board`, {
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
    const websocket = new WebSocket(
      `ws${import.meta.env.VITE_MIDDLEWARE_URI}`
    );

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
        case 'UPDATE_STATS': {
          if (data.player === player) {
            setStats(data.stats);
          }
          break;
        }
        default:
          console.log('Unknown message type');
      }
    };

    websocket.onclose = () => {
      console.log('WebSocket is closed');
    };
  }, [player]);

  let rangeBoard = [];
  let detectedShips = [];

  if (gameboard.length != 0 && stats) {
    let position = gameboard
      .flat()
      .find((t) => t.entity_type === 'ship' && t.entity_id === player);

    rangeBoard = getHexesWithinRange(position.x_coord, position.y_coord, stats.range);
    for (let space of rangeBoard) {
      const tile = gameboard
        .flat()
        .find((t) => t.x_coord + t.y_coord === space);

      if (tile.entity_type === 'ship' && tile.entity_id !== player) {
        detectedShips.push({tile: space, player: tile.entity_id});
      }
    }
  }

  return (
    <>
      <Hexgrid player={player} gameboard={gameboard} rangeBoard={rangeBoard} />
      <Stats stats={stats} />
      <Attack player={player} detectedShips={detectedShips} />
    </>
  );
}
