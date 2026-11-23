import { useEffect, useState } from 'react'
import GameBoard from './components/GameBoard.jsx'
import GameStatus from './components/GameStatus.jsx'
import Header from './components/Header.jsx'
import Instructions from './components/Instructions.jsx'
import LevelSelector from './components/LevelSelector.jsx'
import Timer from './components/Timer.jsx'
import './App.css'

const levels = [
  { id: 'easy', name: 'Easy', gridSize: 6, timeLimit: 240, tone: 'mint' },
  { id: 'medium', name: 'Medium', gridSize: 8, timeLimit: 300, tone: 'blue' },
  { id: 'hard', name: 'Hard', gridSize: 10, timeLimit: 360, tone: 'pink' },
]

const tileKinds = ['elbow', 'straight', 'tee', 'elbow', 'straight', 'cross']

function createBoard(size) {
  return Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, column) => ({
      id: `${row}-${column}`,
      kind: tileKinds[(row * 3 + column * 5) % tileKinds.length],
      rotation: (row + column) % 4,
    })),
  )
}

function App() {
  const [selectedLevel, setSelectedLevel] = useState(levels[0])
  const [board, setBoard] = useState(() => createBoard(levels[0].gridSize))
  const [status, setStatus] = useState('ready')
  const [secondsRemaining, setSecondsRemaining] = useState(levels[0].timeLimit)

  useEffect(() => {
    if (status !== 'playing') {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      if (secondsRemaining <= 1) {
        setSecondsRemaining(0)
        setStatus('lost')
        return
      }

      setSecondsRemaining(secondsRemaining - 1)
    }, 1000)

    return () => window.clearTimeout(timeoutId)
  }, [secondsRemaining, status])

  function resetRound(level = selectedLevel) {
    setBoard(createBoard(level.gridSize))
    setSecondsRemaining(level.timeLimit)
    setStatus('ready')
  }

  function handleLevelSelect(level) {
    setSelectedLevel(level)
    resetRound(level)
  }

  function handleStart() {
    setBoard(createBoard(selectedLevel.gridSize))
    setSecondsRemaining(selectedLevel.timeLimit)
    setStatus('playing')
  }

  function handleTileRotate(tileId) {
    setBoard((currentBoard) =>
      currentBoard.map((row) =>
        row.map((tile) =>
          tile.id === tileId
            ? { ...tile, rotation: (tile.rotation + 1) % 4 }
            : tile,
        ),
      ),
    )
  }

  return (
    <div className="app-shell" id="top">
      <Header />

      <main>
        <section className="hero-section" aria-labelledby="page-title">
          <p className="eyebrow">A little logic. A lot of turns.</p>
          <h1 id="page-title">
            Find your way
            <br />
            <span>through the maze.</span>
          </h1>
          <p className="hero-copy">
            Rotate the connectors and imagine a clear route from the start to
            the exit.
          </p>
        </section>

        <LevelSelector
          levels={levels}
          selectedLevel={selectedLevel.id}
          onSelect={handleLevelSelect}
        />

        <section className="game-layout" id="game" aria-label="Mind Maze board">
          <div className="board-panel">
            <div className="board-panel__heading">
              <div>
                <p className="eyebrow">Your puzzle</p>
                <h2>{selectedLevel.name} maze</h2>
              </div>
              <GameStatus status={status} />
            </div>

            <GameBoard board={board} onTileRotate={handleTileRotate} />

            <p className="board-hint">
              <span className="hint-dot" aria-hidden="true" />
              Select a tile to rotate it clockwise
            </p>
          </div>

          <aside className="game-sidebar" aria-label="Game controls">
            <div className="control-card timer-card">
              <Timer seconds={secondsRemaining} isRunning={status === 'playing'} />
              <div className="timer-actions">
                <button
                  className="button button--primary"
                  type="button"
                  onClick={handleStart}
                  disabled={status === 'playing'}
                >
                  {status === 'lost' ? 'Try again' : status === 'playing' ? 'Maze running' : 'Start maze'}
                </button>
                <button
                  className="button button--quiet"
                  type="button"
                  onClick={() => resetRound()}
                >
                  Reset board
                </button>
              </div>
            </div>

            <Instructions />
          </aside>
        </section>

        <p className="prototype-note">
          Implemented in this build: level selection, 6×6 to 10×10 boards,
          clockwise tile rotation, reset controls, and countdown timer.
        </p>
      </main>

      <footer className="site-footer">
        <span>Mind Maze</span>
        <span>Think ahead. Turn with purpose.</span>
      </footer>
    </div>
  )
}

export default App
