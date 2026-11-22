function LevelCard({ level, selected, onSelect }) {
  const { id, name, gridSize, tone } = level

  return (
    <button
      className={`level-card level-card--${tone}${selected ? ' is-selected' : ''}`}
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(level)}
    >
      <span className="level-card__topline">
        <span className="level-card__marker" aria-hidden="true" />
        <span className="level-card__size">{gridSize} × {gridSize}</span>
      </span>
      <span className="level-card__name">{name}</span>
      <span className="level-card__caption">
        {id === 'easy' ? 'A gentle warm-up' : id === 'medium' ? 'A sharper challenge' : 'For maze masters'}
      </span>
    </button>
  )
}

export default LevelCard
