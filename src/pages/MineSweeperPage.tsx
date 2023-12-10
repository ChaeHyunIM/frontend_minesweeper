import { useAppDispatch, useAppSelector } from '../app/hooks';
import Board from '../components/Board';
import { GAME_LEVEL } from '../constants/GameLevel';
import { setLevel, Level } from '../features/Level/levelSlice';
import useLocalStorage from '../hooks/useLocalStorage';

export default function MineSweeperPage() {
  const [levelInLocalStorage, setLevelInLocalStorage] = useLocalStorage('level', 'Intermediate');
  // const level = useAppSelector(state => state.level.currentLevel);
  const dispatch = useAppDispatch();
  const levelSpec = GAME_LEVEL.find(l => l.name === levelInLocalStorage) || GAME_LEVEL[1];

  const levelButtonHandler = (level: Level) => {
    dispatch(setLevel(level));
    setLevelInLocalStorage(level);
  };
  return (
    <div>
      {GAME_LEVEL.map(level => (
        <button key={level.name} onClick={() => levelButtonHandler(level.name)}>
          {level.name}
        </button>
      ))}
      <Board rows={levelSpec.rows} cols={levelSpec.cols} mines={levelSpec.mines} />
    </div>
  );
}
