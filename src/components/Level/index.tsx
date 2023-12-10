import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { GAME_LEVEL } from '../../constants/GameLevel';
import { Level, setLevel } from '../../features/Level/levelSlice';
import Modal from '../Modal';

export default function LevelChoose() {
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [rows, setRows] = useState('1');
  const [cols, setCols] = useState('1');
  const [mines, setMines] = useState('0');
  const dispatch = useAppDispatch();

  const levelButtonHandler = (level: Level) => {
    if (level === 'Custom') {
      setIsCustomModalOpen(true);
    } else {
      const currentLevel = GAME_LEVEL?.find(l => l.name === level) || GAME_LEVEL[1];
      dispatch(setLevel(currentLevel));
      localStorage.setItem('level', currentLevel.name);
      localStorage.setItem('rows', currentLevel.rows.toString());
      localStorage.setItem('cols', currentLevel.cols.toString());
      localStorage.setItem('mines', currentLevel.mines.toString());
    }
  };

  const handleSubmit = () => {
    if (Number(rows) > 100 || Number(rows) < 1) {
      alert('게임 높이에 1 이상 100 이하의 숫자를 입력해주세요.');
      return;
    }
    if (Number(cols) > 100 || Number(cols) < 1) {
      alert('게임 너비에 1 이상 100 이하의 숫자를 입력해주세요.');
      return;
    }
    if (Number(mines) > (Number(rows) * Number(cols)) / 3 || Number(mines) < 0) {
      alert('지뢰의 개수는 격자칸 수의 1/3 이하로 설정 가능합니다.');
      return;
    }
    dispatch(setLevel({ name: 'Custom', rows: Number(rows), cols: Number(cols), mines: Number(mines) }));
    localStorage.setItem('level', 'Custom');
    localStorage.setItem('rows', rows);
    localStorage.setItem('cols', cols);
    localStorage.setItem('mines', mines);
    setIsCustomModalOpen(false);
  };

  return (
    <div>
      {GAME_LEVEL.map(level => (
        <button key={level.name} onClick={() => levelButtonHandler(level.name)}>
          {level.name}
        </button>
      ))}
      <Modal open={isCustomModalOpen} onClose={() => setIsCustomModalOpen(false)}>
        <div>
          <label>Game Height: </label>
          <input value={rows} onChange={e => setRows(e.target.value.replace(/[^0-9]/g, ''))} />
        </div>
        <div>
          <label>Game Width: </label>
          <input value={cols} onChange={e => setCols(e.target.value.replace(/[^0-9]/g, ''))} />
        </div>
        <div>
          <label>Number of Bombs: </label>
          <input value={mines} onChange={e => setMines(e.target.value.replace(/[^0-9]/g, ''))} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button onClick={handleSubmit}>Confirm</button>
          <button onClick={() => setIsCustomModalOpen(false)}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}
