import React from 'react';

interface CellProps {
  value: number;
  revealed: boolean;
  isMine: boolean;
  isFlagged: boolean;
  onClick: () => void;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function Cell({ value, revealed, isMine, isFlagged, onClick, onContextMenu }: CellProps) {
  return (
    <div
      style={{ border: '1px solid red', width: '30px', height: '30px' }}
      onClick={isFlagged ? () => true : onClick}
      onContextMenu={onContextMenu}
    >
      {revealed && isMine && '💣'}
      {isFlagged && '🚩'}
      {revealed && !isMine && !isFlagged && String(value)}
    </div>
  );
}
