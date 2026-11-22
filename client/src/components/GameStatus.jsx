const statusLabels = {
  ready: 'Ready to play',
  playing: 'In progress',
  won: 'Maze solved',
  lost: 'Time is up',
}

function GameStatus({ status }) {
  return (
    <span className={`game-status game-status--${status}`}>
      <span className="game-status__dot" aria-hidden="true" />
      {statusLabels[status] ?? statusLabels.ready}
    </span>
  )
}

export default GameStatus
