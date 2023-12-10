import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Board from '../components/Board';
import LevelChoose from '../components/Level';

export default function MineSweeperPage() {
  const level = useAppSelector(state => state.level);

  return (
    <div>
      <LevelChoose />
      <Board />
    </div>
  );
}
