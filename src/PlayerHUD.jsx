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
  const [stats, setStats] = useState({ ships: [], bases: [] });

  useEffect(() => {
    fetch(`http${import.meta.env.VITE_MIDDLEWARE_URI}/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStats(data);
      });
  }, []);

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
    const websocket = new WebSocket(`ws${import.meta.env.VITE_MIDDLEWARE_URI}`);

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
          setStats(data.stats);
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

  let shipStats = stats.ships.find((s) => s.player === player) || {};
  let baseStats = stats.bases.find((b) => b.player === player) || {};
  let playerStats = {};
  if (shipStats &&  baseStats) {
    playerStats = { ship: shipStats, base: baseStats };
  }

  let rangeBoard = [];
  let moveBoard = [];
  let detectedEntities = [];

  if (gameboard.length != 0 && playerStats) {
    let position = gameboard
      .flat()
      .find((t) => t.entity_type === 'ship' && t.entity_id === player);

    rangeBoard = getHexesWithinRange(
      position.x_coord,
      position.y_coord,
      playerStats.ship.range
    );
    // rangeBoard = rangeBoard.filter((space) => {
    //   const tile = gameboard
    //     .flat()
    //     .find((t) => t.x_coord + t.y_coord === space);
    //   return (
    //     tile.entity_id !== player
    //   );
    // });

    moveBoard = getHexesWithinRange(
      position.x_coord,
      position.y_coord,
      playerStats.ship.speed
    );
    // moveBoard = moveBoard.filter((space) => {
    //   const tile = gameboard
    //     .flat()
    //     .find((t) => t.x_coord + t.y_coord === space);
    //   return (
    //     tile.entity_type !== 'ship' &&
    //     tile.entity_type !== 'base' &&
    //     tile.entity_id !== player
    //   );
    // });


    for (let space of rangeBoard) {
      const tile = gameboard
        .flat()
        .find((t) => t.x_coord + t.y_coord === space);

      if (
        tile.entity_id !== player &&
        (tile.entity_type === 'ship' || tile.entity_type === 'base') && 
        (stats[`${tile.entity_type}s`].find((e) => e.player === tile.entity_id).health !== 0)
      ) {
        detectedEntities.push({
          tile: space,
          player: tile.entity_id,
          type: tile.entity_type,
        });
      }
    }
  }

  return (
    <>
      <div className="hud-top">
        <h1>Flattles Command</h1>
      </div>
      <div className="player-hud">
        <div className="hud-middle">
          <Hexgrid
            gameboard={gameboard}
            rangeBoard={rangeBoard}
            moveBoard={moveBoard}
            boardStats={stats}
          />
        </div>

        <div className="hud-bottom">
          <h2>Player {player}</h2>
          <Stats stats={playerStats} />
          <Attack player={player} detectedEntities={detectedEntities} />
        </div>
      </div>
    </>
  );
}
