function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Mind Maze home">
        <span className="brand-mark" aria-hidden="true">
          M
        </span>
        <span>
          <strong>mind maze</strong>
          <small>THE TURNING POINT</small>
        </span>
      </a>

      <nav className="site-nav" aria-label="Main navigation">
        <a href="#game">The maze</a>
        <a href="#how-to-play">How to play</a>
      </nav>
    </header>
  )
}

export default Header
