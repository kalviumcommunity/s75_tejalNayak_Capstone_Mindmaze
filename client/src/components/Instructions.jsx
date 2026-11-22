function Instructions() {
  return (
    <section className="control-card instructions" id="how-to-play">
      <p className="eyebrow">The rules</p>
      <h2>How to play</h2>
      <ol>
        <li>
          <span>01</span>
          Start at the glowing tile in the top-left corner.
        </li>
        <li>
          <span>02</span>
          Tap any connector to rotate it 90° clockwise.
        </li>
        <li>
          <span>03</span>
          Find a continuous route to the exit before time runs out.
        </li>
      </ol>
      <div className="endpoint-key">
        <span><i className="endpoint-key__start">S</i> Start</span>
        <span><i className="endpoint-key__exit">E</i> Exit</span>
      </div>
    </section>
  )
}

export default Instructions
