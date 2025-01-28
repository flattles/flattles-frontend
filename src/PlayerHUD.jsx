import { useSearchParams } from 'react-router';
import Attack from './Attack';
import Stats from './Stats';
import Hexgrid from './Hexgrid';
import { mockGameboard } from '../mockData';

export default function PlayerHUD() {
  const [searchParams] = useSearchParams();
  const player = Number(searchParams.get('player'));

  const gameboard = []
  while (mockGameboard.length) gameboard.push(mockGameboard.splice(0, 10));

  return (
    <>
      <Hexgrid player={player} gameboard={gameboard} />
      <Stats player={player} />
      <Attack player={player} />
    </>
  );
}
