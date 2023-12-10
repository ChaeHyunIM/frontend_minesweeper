// Board.tsx

import React, { useEffect } from 'react';
import { initializeBoard, revealCell } from '../../features/counter/boardSlice';
import Cell from '../Cell';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

interface BoardProps {
  rows: number;
  cols: number;
  mines: number;
}

const Board = ({ rows, cols, mines }: BoardProps) => {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state: any) => state.board.board);
  console.log('board', board);

  useEffect(() => {
    dispatch(initializeBoard({ rows, cols, mines }));
  }, [dispatch, rows, cols, mines]);

  const handleCellClick = (row: number, col: number) => {
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

  if (!board || !board.length) return null;

  return <div className="board">{renderBoard()}</div>;
};

export default Board;
