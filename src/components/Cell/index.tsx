import React from 'react';

interface CellProps {
  value: number;
  revealed: boolean;
  isMine: boolean;
  onClick: () => void;
}

export default function Cell({ value, revealed, isMine, onClick }: CellProps) {
  const cellClassName = `cell ${revealed ? 'revealed' : ''} ${isMine ? 'mine' : ''}`;

  return (
    <div className={cellClassName} style={{ border: '1px solid red', width: '30px', height: '30px' }} onClick={onClick}>
      {revealed && (isMine ? '💣' : value)}
    </div>
  );
}
