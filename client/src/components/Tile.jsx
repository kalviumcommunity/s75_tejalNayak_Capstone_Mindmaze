const tilePaths = {
  straight: 'M24 4v40',
  elbow: 'M24 24V4M24 24h20',
  tee: 'M24 24V4M24 24H4M24 24h20',
  cross: 'M24 4v40M4 24h40',
}

function Tile({ tile, row, column, isStart, isExit, onRotate }) {
  const position = `Row ${row + 1}, column ${column + 1}`
  const endpoint = isStart ? ', start' : isExit ? ', exit' : ''

  return (
    <button
      className={`tile${isStart ? ' tile--start' : ''}${isExit ? ' tile--exit' : ''}`}
      type="button"
      aria-label={`${position}${endpoint}, ${tile.kind} connector. Rotate clockwise.`}
      onClick={() => onRotate(tile.id)}
    >
      <svg
        className="tile__pipes"
        viewBox="0 0 48 48"
        aria-hidden="true"
        style={{ transform: `rotate(${tile.rotation * 90}deg)` }}
      >
        <path d={tilePaths[tile.kind]} />
        <circle cx="24" cy="24" r="4" />
      </svg>
      {isStart && <span className="tile__endpoint">S</span>}
      {isExit && <span className="tile__endpoint">E</span>}
    </button>
  )
}

export default Tile
