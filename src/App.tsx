import logo from "./logo.svg"
import { Counter } from "./features/counter/Counter"
import "./App.css"
import Board from "./components/Board"

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  )
  // return <Board rows={10} cols={10} mines={10} />
}

export default App
