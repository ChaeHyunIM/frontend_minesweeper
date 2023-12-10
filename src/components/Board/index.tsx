// Board.tsx

import React, { useEffect } from 'react';
import { initializeBoard, revealCell, setMines } from '../../features/counter/boardSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Cell from '../Cell';
import { startTimer, stopTimer } from '../../features/counter/timerSlice';
import { RootState } from '../../app/store';

interface BoardProps {
  rows: number;
  cols: number;
  mines: number;
}

const Board = ({ rows, cols, mines }: BoardProps) => {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state: RootState) => state.board.board);
  const time = useAppSelector((state: RootState) => state.timer.value);
  const level = useAppSelector((state: RootState) => state.level.currentLevel);

  const [initialized, setInitialized] = React.useState(false);

  useEffect(() => {
    dispatch(initializeBoard({ rows, cols }));
  }, [level]);

  const handleCellClick = (row: number, col: number) => {
    if (!initialized) {
      dispatch(setMines({ mines, board, firstClick: { row, col } }));
      dispatch(startTimer());
      setInitialized(true);
    }
    dispatch(revealCell({ row, col }));
  };

  const renderBoard = () => {
    return board.map((row: any, rowIndex: number) => (
      <div key={rowIndex} className="row" style={{ display: 'flex', width: '100%' }}>
        {row.map((cell: any, colIndex: number) => (
          <Cell
            key={colIndex}
            value={cell.value}
            revealed={cell.revealed}
            isMine={cell.isMine}
            onClick={() => handleCellClick(rowIndex, colIndex)}
          />
        ))}
      </div>
    ));
  };
  const levelButtonHandler = (rows: number, cols: number) => {
    dispatch(initializeBoard({ rows, cols }));
  };

  if (!board || !board.length) return null;

  return (
    <>
      <div>Time: {time} seconds</div>
      <div className="board">{renderBoard()}</div>
    </>
  );
};

export default Board;
