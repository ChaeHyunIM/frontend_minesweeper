// Board.tsx

import React, { useEffect } from 'react';
import { initializeBoard, revealCell, setMines, toggleFlag } from '../../features/Board/boardSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Cell from '../Cell';
import { reset, startTimer, stopTimer } from '../../features/Timer/timerSlice';
import { RootState } from '../../app/store';

const Board = () => {
  const dispatch = useAppDispatch();
  const boardState = useAppSelector((state: RootState) => state.board);
  const { board, status } = boardState;
  const time = useAppSelector((state: RootState) => state.timer.value);
  const level = useAppSelector((state: RootState) => state.level);
  const { name: levelName, rows, cols, mines } = level;

  const [clickedOnce, setClickedOnce] = React.useState(false);

  useEffect(() => {
    dispatch(initializeBoard({ rows, cols }));
    setClickedOnce(false);
    dispatch(stopTimer());
    dispatch(reset());
  }, [levelName]);

  useEffect(() => {
    if (status === 'gameOver' || status === 'victory') {
      dispatch(stopTimer());
      setTimeout(() => {
        alert(`Game ${status === 'gameOver' ? 'Over' : 'Won'}`);
      }, 0);
    }
  }, [status]);

  const handleCellClick = (row: number, col: number) => {
    if (!clickedOnce) {
      dispatch(setMines({ mines, firstClick: { row, col } }));
      dispatch(startTimer());
      setClickedOnce(true);
    }
    dispatch(revealCell({ row, col }));
  };

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: number, col: number) => {
    e.preventDefault();
    dispatch(toggleFlag({ row, col }));
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
            isFlagged={cell.isFlagged}
            onClick={() => handleCellClick(rowIndex, colIndex)}
            onContextMenu={e => handleRightClick(e, rowIndex, colIndex)}
          />
        ))}
      </div>
    ));
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
