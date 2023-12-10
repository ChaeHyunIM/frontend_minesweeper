import './App.css';
import Board from './components/Board';
import MineSweeperPage from './pages/MineSweeperPage';

function App() {
  return (
    <div className="App">
      <MineSweeperPage />
    </div>
  );
  // return <Board rows={10} cols={10} mines={10} />
}

export default App;
