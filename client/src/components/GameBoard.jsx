import Tile from './Tile.jsx'

function GameBoard({ board, onTileRotate }) {
  const size = board.length

  return (
    <div
      className="game-board"
      role="group"
      aria-label={`${size} by ${size} puzzle grid. Start at the top left, exit at the bottom right.`}
      style={{ '--board-size': size }}
    >
      {board.map((row, rowIndex) =>
        row.map((tile, columnIndex) => (
          <Tile
            key={tile.id}
            tile={tile}
            row={rowIndex}
            column={columnIndex}
            isStart={rowIndex === 0 && columnIndex === 0}
            isExit={rowIndex === size - 1 && columnIndex === size - 1}
            onRotate={onTileRotate}
          />
        )),
      )}
    </div>
  )
}

export default GameBoard
