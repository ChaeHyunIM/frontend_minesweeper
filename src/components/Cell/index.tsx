import React from 'react';

interface CellProps {
  value: number;
  revealed: boolean;
  isMine: boolean;
  onClick: () => void;
}

const cellStyle = {
  width: '40px',
  height: '40px',
  border: '1px solid #ccc',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#ccc',
  backgroundColor: '#999',
};

const revealedCellStyle = {
  ...cellStyle,
  backgroundColor: '#ddd',
  cursor: 'default',
};

const mineCellStyle = {
  ...cellStyle,
  backgroundColor: '#fff',
};

export default function Cell({ value, revealed, isMine, onClick }: CellProps) {
  const styleToApply = revealed ? revealedCellStyle : isMine ? mineCellStyle : cellStyle;
  const cellClassName = `cell ${revealed ? 'revealed' : ''} ${isMine ? 'mine' : ''}`;

  return (
    <div className={cellClassName} style={{ border: '1px solid red', width: '30px', height: '30px' }} onClick={onClick}>
      {revealed && (isMine ? '💣' : value)}
    </div>
  );
}
