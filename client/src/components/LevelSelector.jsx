import LevelCard from './LevelCard.jsx'

function LevelSelector({ levels, selectedLevel, onSelect }) {
  return (
    <section className="level-section" aria-labelledby="level-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Choose your challenge</p>
          <h2 id="level-title">Pick a level</h2>
        </div>
        <p className="section-aside">The grid grows with your ambition.</p>
      </div>

      <div className="level-list">
        {levels.map((level) => (
          <LevelCard
            key={level.id}
            level={level}
            selected={selectedLevel === level.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  )
}

export default LevelSelector
