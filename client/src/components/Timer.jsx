function Timer({ seconds, isRunning }) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  const time = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`

  return (
    <div className="timer" aria-live="polite">
      <div className="timer__label">
        <span className={`timer__indicator${isRunning ? ' is-running' : ''}`} aria-hidden="true" />
        {isRunning ? 'Time remaining' : 'Round timer'}
      </div>
      <p className="timer__value" aria-label={`${minutes} minutes ${remainingSeconds} seconds`}>
        {time}
      </p>
    </div>
  )
}

export default Timer
